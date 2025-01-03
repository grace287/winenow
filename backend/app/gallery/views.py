from rest_framework.viewsets import ModelViewSet
from .models import Gallery
from .serializers import GallerySerializer

class GalleryViewSet(ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
