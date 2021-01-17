from django.shortcuts import render
from .models import StudentUser,TeacherUser,links
from .serializers import StudentUserSerializer,TeacherUserSerializer,TeacherUserSerializerP,StudentUserSerializerP,linksSerializer
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import DjangoModelPermissions,IsAdminUser
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets 
from django.core.mail import send_mail
import json
from mysql import connector
from django.db.models import Q
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
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
            con = connector.connect(host="localhost",user="root",password="akshay",database="querydb")
            cur=con.cursor()
            cur.execute("update query_studentuser set lastloginat="+repr(request.data["date"])+" where rollno="+repr(request.data["rollno"]))
            con.commit()
            con.close()
            return Response({'msg':True})

class teacherexists(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        print(request.data)
        if TeacherUser.objects.filter(Q(username=request.data["rollno"])|Q(email=request.data["rollno"]),password=request.data["password"],gender=request.data["gender"]).exists():
            print(request.data)
            con = connector.connect(host="localhost",user="root",password="akshay",database="querydb")
            cur=con.cursor()
            cur.execute("update query_teacheruser set lastloginat="+repr(request.data["date"])+" where username="+repr(request.data["rollno"]))
            con.commit()
            con.close()
            return Response({'msg':True})

class classLinkBlog(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self,request,pk):
        date=datetime.now().strftime("%Y-%m-%d")
        # con=connector.connect(host="localhost",user="root",password="akshay",database="querydb")
        # cur = con.cursor()
        # print("select link,posted_at,subject,posted_by_id,class_time from query_links where section="+repr(pk)+" and class_day="+repr(date))
        # cur.execute("select link,posted_at,subject,posted_by_id,class_time from query_links where section="+repr(pk)+" and class_day="+repr(date))
        # data = cur.fetchall()
        obj = links.objects.filter(section=pk,class_day=date)
        serializer = linksSerializer(obj,many=True)
        return JsonResponse(serializer.data,safe=False)
