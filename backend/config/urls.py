from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from contact.views import current_user


def health(request):
    """Endpoint pour le cron anti-veille : ne touche pas la base de données."""
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", health),
    path("admin/", admin.site.urls),

    # API - section contact (publique en création, admin pour la gestion)
    path("api/contact/", include("contact.urls")),

    # Authentification JWT pour l'espace admin (login du frontend admin)
    path("api/auth/login/", TokenObtainPairView.as_view(),
         name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/me/", current_user, name="current_user"),
]