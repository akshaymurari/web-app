from rest_framework import serializers
from .models import StudentUser,TeacherUser,links,classWiseAttendanceStatus,TeacherQuery,TeacherQueryAnswer,StudentQuery,StudentQueryAnswer,QueryBlog,QueryAnswerBlog

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'

class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        fields = '__all__'        

class TeacherUserSerializerP(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        fields = '__all__'

class StudentUserSerializerP(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'

class linksSerializer(serializers.ModelSerializer):
    class Meta:
        model = links
        fields = "__all__"

class classWiseAttendanceStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = classWiseAttendanceStatus
        fields = '__all__'

class StudentQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuery
        fields = '__all__'

class StudentQueryAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQueryAnswer
        fields = '__all__'
    
class TeacherQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherQuery
        fields = '__all__'

class TeacherQueryAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherQueryAnswer
        fields = '__all__'

class QueryBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryBlog
        fields = '__all__'

class QueryAnswerBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryAnswerBlog
        fields = '__all__'
        