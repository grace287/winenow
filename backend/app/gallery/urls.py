from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GalleryViewSet

# DefaultRouter를 사용하여 API 라우팅 설정
router = DefaultRouter()
router.register(r'gallery', GalleryViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),  # router.urls를 포함하여 API 엔드포인트 제공
]
