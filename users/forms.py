from django import forms
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import get_user_model

class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username', 'email']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['profile_image']


class SignUpForm(UserCreationForm):
    email = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
            'placeholder': '이메일 주소'
        })
    )
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
            'placeholder': '아이디'
        })
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
            'placeholder': '비밀번호'
        })
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
            'placeholder': '비밀번호 확인'
        })
    )

    # 약관 동의 필드들
    terms_service = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={'class': 'h-4 w-4 text-purple-600'}),
        error_messages={'required': '서비스 이용약관에 동의해주세요.'}
    )
    terms_privacy = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={'class': 'h-4 w-4 text-purple-600'}),
        error_messages={'required': '개인정보 처리방침에 동의해주세요.'}
    )
    terms_marketing = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'class': 'h-4 w-4 text-purple-600'})
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2',
                  'terms_service', 'terms_privacy', 'terms_marketing')


class CustomPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
            'placeholder': '가입시 등록한 이메일 주소'
        })
    )

    def clean_email(self):
        email = self.cleaned_data['email']
        User = get_user_model()
        if not User.objects.filter(email=email).exists():
            raise forms.ValidationError('해당 이메일로 등록된 계정이 없습니다.')
        return email