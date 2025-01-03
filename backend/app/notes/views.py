from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import viewsets, permissions
# from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import TastingNote
from .serializers import TastingNoteSerializer

class TastingNoteViewSet(viewsets.ModelViewSet):
    queryset = TastingNote.objects.all()
    serializer_class = TastingNoteSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]  # 인증 문제 생략

    def get_queryset(self):
        if self.request.user.is_staff:
            return TastingNote.objects.all()
        if self.request.user.is_authenticated:
            return TastingNote.objects.filter(user=self.request.user)
        return TastingNote.objects.filter(is_public=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TastingNoteListView(APIView):
    """
    시음 노트 리스트를 반환하는 API View
    """

    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        notes = TastingNote.objects.filter(user=request.user)
        serializer = TastingNoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CalendarNotesView(APIView):
    """
    특정 사용자의 캘린더에 표시될 노트를 반환하는 API View
    """
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]  # 인증 문제 생략

    def get(self, request):
        # 현재 사용자의 노트를 가져옴
        notes = TastingNote.objects.filter(user=request.user)
        serializer = TastingNoteSerializer(notes, many=True)
        return Response(serializer.data)