"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView

from src.views import LeadListApi, session_ping

lead_patterns = [
    path('', LeadListApi.as_view(), name='list'),
]

misc_patterns = [
    path('ping/', session_ping, name="session-ping"),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/leads/', include((lead_patterns, 'leads'))),
    path('api/', include((misc_patterns, 'misc'))),
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?P<path>.*)/$', TemplateView.as_view(template_name='index.html')),
]
