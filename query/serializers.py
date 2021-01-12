from rest_framework import serializers
from .models import StudentUser,TeacherUser
class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'
class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        exclude = ['password']
class TeacherUserSerializerP(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        fields = '__all__'
class StudentUserSerializerP(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'