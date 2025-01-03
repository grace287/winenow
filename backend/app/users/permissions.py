from rest_framework.permissions import BasePermission

class IsGuestOrReadOnly(BasePermission):
    """
    게스트는 읽기 작업만 허용.
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True  # 읽기 허용
        return request.user and not request.user.is_guest  # 게스트가 아닌 경우에만 쓰기 허용
