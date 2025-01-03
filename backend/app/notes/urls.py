from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TastingNoteViewSet, TastingNoteListView, CalendarNotesView

# DefaultRouter 설정
router = DefaultRouter()
router.register(r'tasting-notes', TastingNoteViewSet, basename='tasting-note')

# URL 패턴 정의
urlpatterns = [
    path('', include(router.urls)),  # DefaultRouter에서 자동 생성된 URL 포함
    # path('', TastingNoteViewSet.as_view({'post': 'create', 'get': 'list'}), name='notes-list'),
    # path('<int:pk>/', TastingNoteViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='notes-detail'),
    path('calendar/', CalendarNotesView.as_view(), name='calendar-notes'),  # 캘린더 관련 경로
    # path('tasting-notes-list/', TastingNoteListView.as_view(), name='tasting-note-list'),  # 리스트 API
]
