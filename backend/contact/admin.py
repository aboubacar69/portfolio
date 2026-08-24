from django.contrib import admin
from django.utils.html import format_html

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "short_message", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "ip_address", "created_at")
    list_editable = ("is_read",)
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    actions = ["mark_as_read", "mark_as_unread"]

    def short_message(self, obj):
        text = obj.message if len(
            obj.message) <= 60 else obj.message[:60] + "…"
        return format_html("<span>{}</span>", text)

    short_message.short_description = "Message"

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    mark_as_read.short_description = "Marquer comme lu"

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)

    mark_as_unread.short_description = "Marquer comme non lu"

    def has_add_permission(self, request):
        # Les messages ne sont créés que via le formulaire public (API)
        return False
