import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from notes.models import TastingNote  # notes 앱의 TastingNote 모델 import
from django.db.models import Count, F, Sum, Case, When, Value, CharField
from django.utils import timezone
from datetime import timedelta
from datetime import datetime, timedelta
from django.db.models import Case, When, Value, CharField
import calendar


@login_required(login_url='/users/login/')
def filter_results(request):
    wine_type_filter = request.GET.get('wine_type', '')
    country_filter = request.GET.get('country', '')
    notes = TastingNote.objects.filter(user=request.user)
    if wine_type_filter:
        notes = notes.filter(wine_type=wine_type_filter)
    if country_filter:
        notes = notes.filter(country=country_filter)

    paginator = Paginator(notes, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'dashboard/filter_results.html', {
        'page_obj': page_obj,
        'wine_type_filter': wine_type_filter,
        'country_filter': country_filter
    })


@login_required(login_url='/users/login/') # login_url 변경
def statistics(request):
    user = request.user  # 현재 로그인 사용자
    total_notes_count = TastingNote.objects.filter(user=user).count()

    # 전월 대비 계산 (간단한 예시)
    today = timezone.now().date()
    last_month = today - timedelta(days=30)
    last_month_count = TastingNote.objects.filter(user=user, tasting_date__lte=today,
                                                  tasting_date__gte=last_month).count()
    change = (total_notes_count - last_month_count) / last_month_count * 100 if last_month_count else 0

    statistics_cards = [
        {'icon': 'fas fa-wine-bottle', 'value': total_notes_count or 10, 'label': '총 시음 노트',
         'change': round(change) or 5},  # 예시 데이터 추가
        # ... (다른 카드 추가)
    ]

    # 월별 시음 트렌드 데이터 (간단한 예시)
    monthly_trend_data = TastingNote.objects.filter(user=user).annotate(month=F('tasting_date__month')).values(
        'month').annotate(count=Count('id')).order_by('month')
    if not monthly_trend_data:
        monthly_trend_data = [{'month': i + 1, 'count': 5 + i} for i in range(12)]  # 빈 데이터 추가

    # ... (와인 종류, 지역, 가격대별 데이터 - 비슷한 방식으로 계산)
    wine_type_counts = TastingNote.objects.filter(user=user).values('wine_type').annotate(count=Count('wine_type')).order_by('-count')
    if not wine_type_counts:
        wine_type_counts = [{'wine_type': wine_type, 'count': 10} for wine_type, _ in TastingNote.WINE_TYPES]

    region_counts = TastingNote.objects.filter(user=user).values('country').annotate(count=Count('country')).order_by('-count')
    if not region_counts:
        region_counts = [{'country': country, 'count': 5} for country, _ in TastingNote.WINE_PRODUCING_COUNTRIES]

    price_counts = TastingNote.objects.filter(user=user, price__isnull=False).annotate(price_range=Case(
        When(price__lt=10000, then=Value('10,000원 미만')),
        When(price__range=(10000, 30000), then=Value('10,000원-30,000원')),
        When(price__range=(30000, 50000), then=Value('30,000원-50,000원')),
        When(price__gte=50000, then=Value('50,000원 이상')),
        default=Value('알 수 없음'),
        output_field=CharField(),
    )).values('price_range').annotate(count=Count('id')).order_by('price_range')
    if not price_counts:
        price_counts = [{'price_range': price_range, 'count': 8} for price_range in ['10,000원 미만', '10,000원-30,000원', '30,000원-50,000원', '50,000원 이상', '알 수 없음']]


    context = {
        'statistics_cards': statistics_cards,
        'monthly_trend_data': json.dumps(list(monthly_trend_data), cls=DjangoJSONEncoder),
        'wine_type_counts': json.dumps(list(wine_type_counts), cls=DjangoJSONEncoder),
        'region_counts': json.dumps(list(region_counts), cls=DjangoJSONEncoder),
        'price_counts': json.dumps(list(price_counts), cls=DjangoJSONEncoder),
    }
    return render(request, 'dashboard/statistics.html', context)