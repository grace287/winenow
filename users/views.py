from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from .models import Profile
from django.contrib.auth import logout
from django.http import HttpResponseBadRequest
from django.contrib.auth.views import LoginView
from django.contrib.auth import login
from django.contrib import messages
from .forms import SignUpForm
from .models import UserProfile
from django.contrib.auth.views import PasswordResetView
from .forms import CustomPasswordResetForm
from django.urls import reverse_lazy
from django.shortcuts import render
from django.http import HttpResponse

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()

            # 사용자 프로필 생성
            UserProfile.objects.create(
                user=user,
                marketing_agreement=form.cleaned_data.get('terms_marketing', False)
            )

            login(request, user)
            messages.success(request, '회원가입이 완료되었습니다.')
            return redirect('home')
    else:
        form = SignUpForm()

    return render(request, 'register/signup.html', {'form': form})

def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            next_page = request.GET.get('next', 'notes:home')
            return redirect(next_page)
    else:
        form = AuthenticationForm()
    return render(request, "users/login.html", {'form': form})

class CustomLoginView(LoginView):
    """
    Django 기본 LoginView를 확장하여 사용자의 Profile을 로그인 시 자동 생성
    """
    def form_valid(self, form):
        # 사용자 로그인 성공 후 Profile 확인
        user = form.get_user()
        if not hasattr(user, 'profile'):
            Profile.objects.create(user=user)
        return super().form_valid(form)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('notes:home')  # 또는 다른 적절한 페이지로 리다이렉트
    else:
        return HttpResponseBadRequest("잘못된 요청입니다. POST 방식으로 요청해주세요.") # 또는 다른 에러 메시지

@login_required(login_url='/users/login/')

def profile(request):
    try:
        profile = request.user.profile
        context = {'user': request.user, 'profile': profile}
        return render(request, 'users/profile.html', context)
    except Profile.DoesNotExist:
        return HttpResponse("프로필이 없습니다.") # 또는 다른 에러 메시지 또는 리다이렉트

@login_required(login_url='/users/login/')
def profile_edit(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            return redirect('users:profile') # Redirect to the profile page after successful update
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'users/profile_edit.html', context)

class CustomPasswordResetView(PasswordResetView):
    template_name = 'register/password_reset.html'
    email_template_name = 'register/password_reset_email.html'
    form_class = CustomPasswordResetForm
    success_url = reverse_lazy('password_reset_done')