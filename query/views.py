from django.shortcuts import render
from .models import StudentUser,TeacherUser
from .serializers import StudentUserSerializer,TeacherUserSerializer,TeacherUserSerializerP,StudentUserSerializerP
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import DjangoModelPermissions,IsAdminUser
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets 
from django.core.mail import send_mail
import json
from django.db.models import Q
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
class student(viewsets.ModelViewSet):
    queryset=StudentUser.objects.all()
    serializer_class = StudentUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]

class teacher(viewsets.ModelViewSet):
    queryset=TeacherUser.objects.all()
    serializer_class = TeacherUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]

class StudentForgotPassword(viewsets.ModelViewSet):
    queryset=StudentUser.objects.all()
    serializer_class = StudentUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]

class forgetpassword(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes =[DjangoModelPermissions]
    def post(self,request):
        data=json.loads(request.body)
        print(data)
        if data['type'] == 'teacher':
            obj = TeacherUser.objects.get(email=data['email'])
            serializer = StudentUserSerializerP(obj)
            password = serializer.data['password']
        if data['type'] == 'student':
            obj = StudentUser.objects.get(email=data['email'])
            serializer = TeacherUserSerializerP(obj)
            print(serializer.data)
            password = serializer.data['password']        
            send_mail('from visual meet','your password : '+password,'akshaymurari184@gmail.com',[data['email']],fail_silently=False)
            return Response({"msg":"success"})
class studentexists(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        print(request.data)
        if StudentUser.objects.filter(Q(rollno=request.data["rollno"])|Q(email=request.data["rollno"]),password=request.data["password"],gender=request.data["gender"]).exists():
            print(request.data)
            return Response({'msg':True})
class teacherexists(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        print(request.data)
        if TeacherUser.objects.filter(Q(rollno=request.data["rollno"])|Q(email=request.data["rollno"]),password=request.data["password"],gender=request.data["gender"]).exists():
            print(request.data)
            return Response({'msg':True})

