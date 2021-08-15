import logging
from uuid import uuid4

from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from src.models import Lead
from src.services import create_lead

logger = logging.getLogger(__name__)

class LeadListApi(APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Lead
            fields = ("email", "source")

    def post(self, request):
        serializer = self.InputSerializer(data={**request.data, "source": request.META.get("HTTP_REFERER")})
        serializer.is_valid(raise_exception=True)

        lead = create_lead(**serializer.validated_data)
        data = self.InputSerializer(lead).data

        return Response(data)

@api_view(["GET"])
def session_ping(request):
    """
    This endpoint is used to initialize the user's session.
    See: https://github.com/django/channels/issues/1425#issuecomment-639831977
    """
    if not request.session.get("player_id"):
        request.session["player_id"] = str(uuid4()) 
        request.session.save()
        logger.info("player_id set")
    
    player_id = request.session.get("player_id")
    response =  Response({"message": "session_pong"})
    response.set_cookie("player_id", player_id)
    logger.info(f"player_id cookie has been set: {player_id}")
    
    return response
