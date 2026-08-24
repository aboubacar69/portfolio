from django.db import models


class ContactMessage(models.Model):
    """Représente un message envoyé via le formulaire de contact du site."""

    name = models.CharField(max_length=100, verbose_name="Nom complet")
    email = models.EmailField(max_length=255, verbose_name="Courriel")
    message = models.TextField(max_length=1000, verbose_name="Message")

    is_read = models.BooleanField(default=False, verbose_name="Lu")
    ip_address = models.GenericIPAddressField(
        null=True, blank=True, verbose_name="Adresse IP"
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Reçu le")

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.created_at:%Y-%m-%d %H:%M}"
