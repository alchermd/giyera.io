"""
ASGI config for giyera.io-server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path

from src.consumers import ChatConsumer, WebSocketGameConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

websocket_patterns = [
    path('ws/chat/<int:room_number>/', ChatConsumer.as_asgi()),
    path('ws/game/<str:game_code>/', WebSocketGameConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_patterns,
        )
    )
})
