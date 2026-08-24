from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactMessage
from .serializers import ContactMessageCreateSerializer, ContactMessageAdminSerializer


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class ContactSubmitThrottle(AnonRateThrottle):
    scope = "contact_submit"


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    - create (POST /api/contact/messages/)      -> public, réservé aux visiteurs du site
    - list/retrieve/update/destroy               -> réservés à l'admin (is_staff)
    """

    queryset = ContactMessage.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return ContactMessageCreateSerializer
        return ContactMessageAdminSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_throttles(self):
        if self.action == "create":
            return [ContactSubmitThrottle()]
        return super().get_throttles()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(ip_address=get_client_ip(request))
        return Response(
            {"detail": "Message envoyé avec succès.", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def unread_count(self, request):
        """GET /api/contact/messages/unread_count/ -> nombre de messages non lus."""
        count = self.get_queryset().filter(is_read=False).count()
        return Response({"unread_count": count})

    @action(detail=True, methods=["patch"], permission_classes=[permissions.IsAdminUser])
    def mark_read(self, request, pk=None):
        """PATCH /api/contact/messages/{id}/mark_read/ -> marque un message comme lu."""
        message = self.get_object()
        message.is_read = True
        message.save(update_fields=["is_read"])
        return Response(self.get_serializer(message).data)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    """GET /api/auth/me/ -> infos sur l'admin connecté (utile pour le frontend admin)."""
    user = request.user
    return Response(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        }
    )
