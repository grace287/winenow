from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# from config.notes.views import gallery

urlpatterns = [
    path('admin/', admin.site.urls),

    path('users/', include('users.urls', namespace='users')),
    path('', include('notes.urls', namespace='notes')),
    path('gallery/', include('gallery.urls', namespace='gallery')),
    path('dashboard/', include('dashboard.urls', namespace='dashboard')),
] # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:  # Only add static serving in DEBUG mode
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)