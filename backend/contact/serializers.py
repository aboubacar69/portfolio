from rest_framework import serializers

from .models import ContactMessage


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    """Utilisé par les visiteurs pour envoyer un message (correspond au contactSchema du frontend)."""

    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Le nom est requis")
        if len(value) > 100:
            raise serializers.ValidationError("Maximum 100 caractères")
        return value

    def validate_message(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Le message est requis")
        if len(value) > 1000:
            raise serializers.ValidationError("Maximum 1000 caractères")
        return value


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """Utilisé par l'admin pour consulter/gérer les messages reçus."""

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "message",
            "is_read",
            "ip_address",
            "created_at",
        ]
        read_only_fields = ["id", "name", "email",
                            "message", "ip_address", "created_at"]
