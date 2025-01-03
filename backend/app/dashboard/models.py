from django.db import models

class Dashboard(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # 사용자 연결
    wine_name = models.CharField(max_length=255)
    tasting_date = models.DateField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)  # 평점
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.wine_name}"
