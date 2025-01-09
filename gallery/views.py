from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from notes.models import TastingNote, Tag  # notes 앱의 TastingNote 모델 import


@login_required(login_url='/users/login/')
def gallery_view(request):
    # 태그 필터링
    tag_slug = request.GET.get('tag')
    notes = TastingNote.objects.filter(user=request.user).order_by('-created_at')

    selected_tag = None
    if tag_slug:  # 태그가 선택된 경우 필터링
        selected_tag = get_object_or_404(Tag, slug=tag_slug)
        notes = notes.filter(tags=selected_tag)

    # notes = TastingNote.objects.filter(user=request.user).prefetch_related('tags').order_by('-created_at')
    paginator = Paginator(notes, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # 모든 태그 가져오기
    tags = Tag.objects.all()

    view = request.GET.get('view', 'grid')
    current_tag = tag_slug if tag_slug else ''
    selected_tag = get_object_or_404(Tag, slug=tag_slug) if tag_slug else None

    # 컨텍스트 생성
    context = {
        'page_obj': page_obj,
        'tags': tags,  # 선택된 태그
        'view': view,
        'current_tag': current_tag,
        'selected_tag': selected_tag,  # Pass the selected tag to the template
    }

    # 페이지네이션
    paginator = Paginator(notes, 6)  # 한 페이지에 6개씩
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'gallery/gallery.html', {'page_obj': page_obj})


@login_required(login_url='/users/login/') # login_url 변경
def gallery(request):
    notes = TastingNote.objects.filter(user=request.user).order_by('-created_at')

    # 페이지네이션
    paginator = Paginator(notes, 6)  # 한 페이지에 6개씩
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'notes/gallery.html', {'page_obj': page_obj})