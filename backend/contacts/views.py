from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ContactSerializer, ConnectionSerializer
from .models import Contact, Connection


# Create your views here.
class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


class ConnectionView(viewsets.ModelViewSet):
    serializer_class = ConnectionSerializer
    queryset = Connection.objects.all()
