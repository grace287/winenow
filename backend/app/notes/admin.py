# admin.py
from django.contrib import admin
from .models import TastingNote

@admin.register(TastingNote)
class TastingNoteAdmin(admin.ModelAdmin):
    list_display = ('wine_name', 'tasting_date', 'is_public')
    list_filter = ('is_public', 'tasting_date')
    search_fields = ('wine_name', 'winery', 'tasting_place')
