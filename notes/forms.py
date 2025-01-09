from django import forms
from bootstrap_datepicker_plus.widgets import DatePickerInput
from .models import TastingNote


class TastingNoteForm(forms.ModelForm):
    class Meta:
        model = TastingNote
        fields = '__all__'
        exclude = ['user', 'created_at', 'updated_at']
        widgets = {
            'tasting_date': DatePickerInput(format='%Y-%m-%d'), #DatePickerInput 위젯으로 변경
            'appearance_intensity': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
            'aroma_intensity': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
            'sweetness': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
            'acidity': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
            'tannin': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
            'body': forms.NumberInput(attrs={'type': 'range', 'min': 1, 'max': 5, 'value': 3}),
        }