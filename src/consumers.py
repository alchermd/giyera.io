import json
import logging
from typing import List
from uuid import uuid4

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer, AsyncWebsocketConsumer

from src.models import Game


logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    room_number: int
    room_group_name: str

    async def connect(self):
        self.room_number = self.scope['url_route']['kwargs']['room_number']
        self.room_group_name = f"chat_{self.room_number}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        # Leave group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        message = json.loads(text_data)['message']

        # Send message to room group
        await self.channel_layer.group_send(self.room_group_name, {'type': 'chat_message', 'message': message})

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message,
        }))


class WebSocketGameConsumer(AsyncJsonWebsocketConsumer):
    game_code: str
    game_name: str
    game: Game

    def __init__(self, *args, **kwargs):
        self.game = None
        super().__init__(*args, **kwargs)

    async def connect(self):
        self.game_code = self.scope['url_route']['kwargs']['game_code']
        self.game_name = f"game_{self.game_code}"
        
        self.game, created = await database_sync_to_async(Game.objects.get_or_create)(code=self.game_code, name=self.game_name)
        if created:
            logger.info(f"Game {self.game} has been created.")
        else:
            logger.info(f"Game {self.game} already exists.")

        # Join room group
        await self.channel_layer.group_add(self.game_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        # Leave group
        await self.channel_layer.group_discard(self.game_name, self.channel_name)

    async def receive(self, text_data=None):
        payload = json.loads(text_data)
        type = payload.get("type", None)

        if type == "JOIN":
            # We make sure that each new connected client will be assigned as a unique player in the game's context.
            session = self.scope["session"]
            player_id = session.get("player_id")
            
            if player_id not in [self.game.player1_id, self.game.player2_id]:
                if not self.game.player1_id:
                    logger.info(f"Player {player_id} has been added as player 1")
                    self.game.player1_id = player_id
                elif not self.game.player2_id:
                    logger.info(f"Player {player_id} has been added as player 2")
                    self.game.player2_id = player_id
            
            await database_sync_to_async(self.game.save)()
            await database_sync_to_async(session.save)()

            players = [self.game.player1_id, self.game.player2_id]
            payload = {
                "players": players,
                "status": "READY" if all(players) else "WAITING"
            }
            await self.channel_layer.group_send(self.game_name, {'type': 'user_join', 'payload': payload})
        

    async def user_join(self, event):
        payload = event['payload']
        await self.send(text_data=json.dumps({**payload, 'type': "USER_JOIN"}))