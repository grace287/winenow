from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_guest', 'create_at']
        read_only_fields = ['id', 'create_at']

    def create(self, validated_data):
        if 'is_guest' in validated_data and validated_data['is_guest']:
            # 게스트 사용자 생성
            return User.objects.create_user(username=f"guest_{User.objects.count()}", is_guest=True)
        else:
            # 소셜 사용자 생성 (이메일은 필수)
            if not validated_data.get('email'):
                raise serializers.ValidationError({"email": "Email is required for non-guest users."})
            return User.objects.create_user(**validated_data)
