from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.timezone import now

class User(AbstractUser):
    is_guest = models.BooleanField(default=False)  # 게스트 여부
    create_at = models.DateTimeField(default=now)  # 생성일자

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",  # 기본 'user_set' 대신 다른 이름 지정
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",  # 기본 'user_set' 대신 다른 이름 지정
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    def __str__(self):
        return self.username or "Guest User"
