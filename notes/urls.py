from django.urls import path
from . import views

app_name = 'notes'

urlpatterns = [
    path('', views.home, name='home'),
    path('notes/<int:year>/<int:month>/', views.home, name='notes_month'),
    path('<int:year>/<int:month>/', views.home, name='home'), # year/month를 인자로 받는 URL 패턴
    path('get_events/', views.get_events, name='get_events'), # 새로운 URL 패턴
    path('notes/<int:note_id>/', views.note_detail, name='note_detail'),
    path('notes/create/', views.note_create, name='note_create'),
    path('notes/<int:note_id>/edit/', views.note_edit, name='note_edit'),
    path('notes/<int:note_id>/delete/', views.note_delete, name='note_delete'),
    path('notes/search/', views.search_notes, name='search_notes'),
    path('notes/filter/', views.filter_notes, name='filter_notes'),
]