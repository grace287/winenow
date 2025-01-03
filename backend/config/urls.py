from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    # Admin URL
    path("admin/", admin.site.urls),

    path('accounts/', include('allauth.urls')),  # django-allauth URL 포함
    # 기본 경로 리다이렉션
    path("", lambda request: HttpResponseRedirect("/api/docs/")),
    # Swagger 및 Schema 관련
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # 앱별 API
    path('api/users/', include('app.users.urls')),
    path('api/community/', include('app.community.urls')),  # 커뮤니티 CRUD
    path('api/notes/', include('app.notes.urls')),          # 노트 CRUD
    path('api/gallery/', include('app.gallery.urls')),      # 갤러리 CRUD
    path('api/dashboard/', include('app.dashboard.urls')),  # 대시보드 CRUD
]
