from django.urls import path
from . import consumer

websocket_urlpatterns = [
    path('ws/chat/<int:property_id>/<int:other_user_id>/', consumer.ChatConsumer.as_asgi(), name='chat'),
]