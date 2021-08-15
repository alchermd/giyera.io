import json

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from src.models import Lead
from src.services import create_lead


class CreateLeadTests(TestCase):
    def test_can_create_new_leads(self):
        data = {
            "email": "test@example.com",
            "source": "http://localhost",
        }
        lead = create_lead(**data)
        self.assertEquals(lead.email, data["email"])
        self.assertEquals(lead.source, data["source"])


class CreateLeadApiTests(APITestCase):
    def test_can_create_new_leads(self):
        data = {
            "email": "test@example.com",
            "source": "http://localhost",
        }
        response = self.client.post(
            reverse("leads:list"),
            data=json.dumps(data),
            content_type="application/json",
            HTTP_REFERER=data["source"],
        )

        lead = Lead.objects.last()
        self.assertEquals(lead.email, data["email"])
        self.assertEquals(lead.source, data["source"])

        self.assertEquals(response.data, data)
