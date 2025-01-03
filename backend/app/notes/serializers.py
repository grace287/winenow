from rest_framework import serializers
from .models import TastingNote

class TastingNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TastingNote
        fields = '__all__'
