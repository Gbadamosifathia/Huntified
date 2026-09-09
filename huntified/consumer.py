import json
from channels.db import database_sync_to_async
from .models import Message
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):         
    @database_sync_to_async
    def save_message(self, text):
        return Message.objects.create(
            sender=self.user,
            recipient_id=self.other_user_id,
            property_id=self.property_id,
            message=text
        )
    
    async def connect(self): 
        self.property_id = self.scope['url_route']['kwargs']['property_id']
        self.other_user_id = self.scope['url_route']['kwargs']['other_user_id']
        self.user = self.scope['user']
        ids = sorted([self.user.id, int(self.other_user_id)])
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
        message_text = text_data_json['message']
        new_message = await self.save_message(message_text)
        await self.channel_layer.group_send(
        self.room_group_name,
        {
        'type': 'chat_message',
        'message': message_text,
        'sender_id': self.user.id
        }
    )
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
        'message': event['message'],
        'sender_id': event['sender_id']
    }))