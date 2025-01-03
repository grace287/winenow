from rest_framework.viewsets import ModelViewSet
from .models import Dashboard
from .serializers import DashboardSerializer
from rest_framework.permissions import IsAuthenticated

class DashboardViewSet(ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # 현재 로그인된 사용자의 대시보드 데이터만 반환
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # 새 데이터를 생성할 때 사용자 정보 추가
        serializer.save(user=self.request.user)
