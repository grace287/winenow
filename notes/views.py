from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q, Count
from django.core.paginator import Paginator
from .models import TastingNote, TastingEvent
from .forms import TastingNoteForm
from django.utils import timezone
import calendar
from calendar import HTMLCalendar
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.http import JsonResponse
from taggit.models import Tag  # 태그 모델 import
from notes.models import Tag
from datetime import date, timedelta
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
import json
from django.core.serializers.json import DjangoJSONEncoder

def get_events(request):
    start = request.GET.get('start') # FullCalendar에서 전달되는 시작 날짜
    end = request.GET.get('end')     # FullCalendar에서 전달되는 종료 날짜

    # 날짜 범위에 해당하는 시음 노트 가져오기
    notes = TastingNote.objects.filter(user=request.user, tasting_date__range=(start, end))

    events = []
    for note in notes:
        events.append({
            'title': note.wine_name,
            'start': note.tasting_date.strftime('%Y-%m-%d'),  # 날짜 형식 지정
            'url': reverse('notes:note_detail', args=[note.id]), # 상세 페이지 링크
        })
    return JsonResponse(events, safe=False)

# @login_required
def home(request, year=None, month=None):
    today = timezone.now().date()
    year = int(year) if year else today.year
    month = int(month) if month else today.month

    # 이전/다음 달 URL 생성
    prev_year, prev_month = prev_month_info(year, month)
    next_year, next_month = next_month_info(year, month)
    prev_month_url = reverse('notes:home', args=[prev_year, prev_month])
    next_month_url = reverse('notes:home', args=[next_year, next_month])

    # 현재 사용자의 해당 월 노트 데이터 가져오기
    notes = TastingNote.objects.filter(
        user=request.user, tasting_date__year=year, tasting_date__month=month
    )

    # 날짜별 노트 데이터 집계
    note_counts = {}
    for note in notes:
        day = note.tasting_date.day
        if day not in note_counts:
            note_counts[day] = []
        note_counts[day].append({'id': note.id, 'wine_name': note.wine_name})

    # note_counts = {}
    # for event in events:
    #     day = event.date.day
    #     note_counts[day] = note_counts.get(day, []) + [
    #         {'id': event.tasting_note.id, 'wine_name': event.tasting_note.wine_name,
    #          'tasting_date': event.date.strftime('%Y-%m-%d')}]

    # Get tasting events for the current month
    tasting_events = TastingEvent.objects.filter(
        tasting_note__user=request.user,
        date__year=year,
        date__month=month,
    ).order_by('date')

    notes = []
    if request.user.is_authenticated:  # Check if the user is authenticated
        events = TastingEvent.objects.filter(tasting_note__user=request.user, date__year=year, date__month=month)
        notes = TastingNote.objects.filter(user=request.user, tasting_date__year=year, tasting_date__month=month)
        for note in notes:
            day = note.tasting_date.day
            note_counts[day] = note_counts.get(day, []) + [{'id': note.id, 'wine_name': note.wine_name}]

    # 커스텀 HTML 캘린더 생성
    cal = calendar.HTMLCalendar(firstweekday=6).formatmonth(year, month)  # 캘린더 생성 (일요일 시작)
    form = TastingNoteForm()  # Form is created here, not conditionally in POST

    home_url = reverse('notes:note_create')

    context = {
        'year': year,
        'month': month,
        'calendar': cal,
        'note_counts': note_counts,
        'prev_year': prev_year,  # 이전 달 year
        'prev_month': prev_month,  # 이전 달 month
        'next_year': next_year,  # 다음 달 year
        'next_month': next_month,  # 다음 달 month
        'notes': notes,  # notes 변수 context에 추가
        'form': form,  # Add the form to the context
        'home_url': home_url,
    }
    return render(request, 'notes/home.html', context)

def prev_month_info(year, month):
    if month == 1:
        return year - 1, 12
    else:
        return year, month - 1

def next_month_info(year, month):
    if month == 12:
        return year + 1, 1
    else:
        return year, month + 1


@login_required(login_url='/users/login/') # login_url 변경
def note_detail(request, note_id):
    note = get_object_or_404(TastingNote, pk=note_id, user=request.user)
    return render(request, 'notes/note_detail.html', {'note': note})


@login_required(login_url='/users/login/') # login_url 변경
def note_create(request):
    if request.method == 'POST':
        form = TastingNoteForm(request.POST, request.FILES)
        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            note.save()
            return JsonResponse({'status': 'success', 'message': '시음 노트가 성공적으로 저장되었습니다.'})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': '잘못된 요청입니다. POST 방식으로 요청해주세요.'}, status=400)
# def note_create(request):
#     if request.method == 'POST':
#         form = TastingNoteForm(request.POST, request.FILES)
#         if form.is_valid():
#             note = form.save(commit=False)
#             note.user = request.user
#             note.save()
#             return redirect('notes:home')
#     else:
#         form = TastingNoteForm()
#     return render(request, 'notes/note_form.html', {'form':form}) # Render a simple form for now


@login_required(login_url='/users/login/') # login_url 변경
def note_edit(request, note_id):
    note = get_object_or_404(TastingNote, pk=note_id, user=request.user)
    if request.method == 'POST':
        form = TastingNoteForm(request.POST, request.FILES, instance=note)
        if form.is_valid():
            form.save()
            return redirect('notes:note_detail', note_id=note.id)
    else:
        form = TastingNoteForm(instance=note)
    return render(request, 'notes/note_form.html', {'form': form})


@login_required(login_url='/users/login/') # login_url 변경
def note_delete(request, note_id):
    note = get_object_or_404(TastingNote, pk=note_id, user=request.user)
    if request.method == 'POST':
        note.delete()
        return redirect('notes:gallery')
    return render(request, 'notes/note_delete.html', {'note': note})


@login_required(login_url='/users/login/') # login_url 변경
def search_notes(request):
    query = request.GET.get('q', '')  # 검색어를 가져옴
    notes = TastingNote.objects.filter(user=request.user)  # 현재 사용자의 모든 노트 가져옴
    if query:
        notes = notes.filter(
            Q(wine_name__icontains=query) |  # 와인 이름
            Q(wine_varietal__icontains=query) |  # 품종
            Q(winery__icontains=query) |  # 와이너리
            Q(tasting_place__icontains=query) |  # 테이스팅 장소
            Q(aroma_notes__icontains=query) |  # 아로마 노트
            Q(overall__icontains=query)  # 전체 평가
        )

        # 페이지네이션
        paginator = Paginator(notes, 5)  # 한 페이지에 5개씩
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

    else:
        # 페이지네이션
        paginator = Paginator(notes, 5)  # 한 페이지에 5개씩
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
    return render(request, 'notes/search_results.html', {'page_obj': page_obj, 'query': query})


@login_required(login_url='/users/login/') # login_url 변경
def filter_notes(request):
    wine_type_filter = request.GET.get('wine_type', '')
    country_filter = request.GET.get('country', '')
    notes = TastingNote.objects.filter(user=request.user)  # 모든 노트 가져오기
    if wine_type_filter:
        notes = notes.filter(wine_type=wine_type_filter)
    if country_filter:
        notes = notes.filter(country=country_filter)

    # 페이지네이션
    paginator = Paginator(notes, 5)  # 한 페이지에 5개씩
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'notes/filter_results.html', {'page_obj': page_obj, 'wine_type_filter': wine_type_filter,
                                                        'country_filter': country_filter})


