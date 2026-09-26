import json
from channels.db import database_sync_to_async
from .models import Message
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):         
    @database_sync_to_async
    def save_message(self, text):
        try:
            return Message.objects.create(
                sender=self.user,
                recipient_id=self.other_user_id,
                property_id=self.property_id,
                message=text
            )
        except Exception as e:
            print(f"DATABASE SAVE ERROR: {e}")
            return None
    
    async def connect(self): 
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            await self.close()
            return
        self.property_id = int(self.scope['url_route']['kwargs']['property_id'])
        self.other_user_id = int(self.scope['url_route']['kwargs']['other_user_id'])
        ids = sorted([self.user.id, (self.other_user_id)])
        self.room_group_name = f"chat_{self.property_id}_{ids[0]}_{ids[1]}"
        await self.channel_layer.group_add(
        self.room_group_name,
        self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json.get('message')

        if not message_text:
            return

        # 1. Save to database first and ensure it succeeded
        new_message = await self.save_message(message_text)
        if not new_message:
            print("Error: Message failed to save to the database.")
            return

        # 2. Broadcast to room group only if save was successful
        try:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': new_message.message,
                    'sender_id': self.user.id,
                    'created_at': str(new_message.created_at) if hasattr(new_message, 'created_at') else None
                }
            )
        except Exception as e:
            print(f"Broadcast failed: {e}")

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender_id': event['sender_id'],
            'created_at': event.get('created_at')
        }))
