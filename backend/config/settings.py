"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 5.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-hm)gk7o5hw355i0dl3-=31d1e9vsyvftj3spzag#zjnrrjr^hp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # apps
    'app.users',
    'app.community',
    'app.notes',
    'app.gallery',
    'app.dashboard',

    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'drf_yasg',

    'drf_spectacular',
    'drf_spectacular_sidecar',  # Swagger UI 제공

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',  # Google 소셜 로그인 사용 시 추가
    'allauth.socialaccount.providers.kakao',
    'allauth.socialaccount.providers.naver',
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',  # 기본 인증
    'allauth.account.auth_backends.AuthenticationBackend',  # allauth 인증
)

SITE_ID = 1  # Django 사이트 ID

# 이메일을 사용자 인증 필드로 사용
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False

# 로그인 및 로그아웃 설정
LOGIN_REDIRECT_URL = '/'  # 로그인 후 리다이렉트 경로
ACCOUNT_LOGOUT_REDIRECT_URL = '/'  # 로그아웃 후 리다이렉트 경로

SWAGGER_SETTINGS = {
   'SECURITY_DEFINITIONS': {
       'Bearer': {
           'type': 'apiKey',
           'name': 'Authorization',
           'in': 'header'
       }
   },
   'USE_SESSION_AUTH': False,
   'JSON_EDITOR': True,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # Allauth Account Middleware
    'allauth.account.middleware.AccountMiddleware',  # 여기 추가
]

# CORS_ALLOWED_ORIGINS = [
#        "http://localhost:3000",  # React 개발 서버 주소
#    ]

# 특정 출처만 허용 (운영 환경에서 권장)
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',  # 프론트엔드 URL
#     'http://127.0.0.1:3000', # 프론트엔드 URL
# ]

# 모든 출처 허용 (개발 환경에서만 권장)
CORS_ALLOW_ALL_ORIGINS = True

# 인증이 필요한 요청에서 쿠키 허용
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
           
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ],
#     'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
# }

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # 인증 문제 생략
    ],
}

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'WineNow API',
    'DESCRIPTION': '와인 테이스팅 노트 관리 애플리케이션 API 문서입니다.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': True,
    'SERVE_PERMISSIONS': ['rest_framework.permissions.AllowAny'],
    'COMPONENT_SPLIT_REQUEST': True,
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
        'persistAuthorization': True,
    },
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'

# 정적 파일 디렉토리 추가
STATICFILES_DIRS = [
    BASE_DIR / "static",  # 프로젝트에 추가된 정적 파일 경로
]

# collectstatic 명령어로 정적 파일을 한 곳에 모으기 위한 경로
STATIC_ROOT = BASE_DIR / "staticfiles"


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}
