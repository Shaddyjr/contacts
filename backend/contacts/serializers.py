from rest_framework import serializers
from .models import Contact, Connection


class ConnectionSerializer(serializers.ModelSerializer):
    contact = serializers.PrimaryKeyRelatedField(queryset=Contact.objects.all())

    class Meta:
        model = Connection
        fields = (
            "id",
            "date",
            "note",
            "contact",
        )


class ContactSerializer(serializers.ModelSerializer):
    all_connections = ConnectionSerializer(
        source="connections", many=True, required=False, read_only=True
    )

    class Meta:
        model = Contact
        fields = (
            "id",
            "name",
            "next_connection",
            "note",
            "cadence",
            "contact_method",
            "state",
            "all_connections",
        )
