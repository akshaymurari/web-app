from django.shortcuts import render
from .models import StudentUser,TeacherUser,links,classWiseAttendanceStatus
from .serializers import StudentUserSerializer,TeacherUserSerializer,TeacherUserSerializerP,StudentUserSerializerP,linksSerializer,classWiseAttendanceStatusSerializer
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
from rest_framework.filters import SearchFilter,OrderingFilter
class student(viewsets.ModelViewSet):
    queryset=StudentUser.objects.all()
    serializer_class = StudentUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]

class filterClassLinkBlogByUsername(APIView):
    authentication_classes=[TokenAuthentication]
    def get(self,request,pk):
        date=datetime.now().strftime("%Y-%m-%d")
        obj = links.objects.filter(posted_by_id=pk,class_day=date)
        serializer = linksSerializer(obj,many=True)
        print(serializer.data)
        return JsonResponse(serializer.data,safe=False)
        pass

class addClassLinks(viewsets.ModelViewSet):
    queryset = links.objects.all()
    serializer_class = linksSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [DjangoModelPermissions]
    # def destroy(self,request, *args, **kwargs):
        # try:
        #     obj = links(posted_by=request.data["posted_by"],class_time=request.data["class_time"])
        #     obj.delete()
        #     return JsonResponse({"msg":True})
        # except:
        #     return JsonResponse({"msg":False})
        # pass

class deleteClassLinks(APIView):
    authentication_classes = [TokenAuthentication]
    def delete(self,request):
        try:
            print("hii")
            obj = links.objects.get(id=request.data["id"])
            obj.delete()
            return JsonResponse({"msg":True})
        except:
            return JsonResponse({"msg":False})
        pass

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
    def post(self, request):
        day=request.data["date"].split('T')[0]
        obj = links(posted_by_id=request.data["posted_by"],class_time=request.data["date"],subject=request.data["subject"],section=request.data["section"],link=request.data["link"],class_day=day)
        obj.save()
        return JsonResponse({'msg':True})
        pass
    def get(self,request,pk):
        date=datetime.now().strftime("%Y-%m-%dT%H:%M")
        # con=connector.connect(host="localhost",user="root",password="akshay",database="querydb")
        # cur = con.cursor()
        # print("select link,posted_at,subject,posted_by_id,class_time from query_links where section="+repr(pk)+" and class_day="+repr(date))
        # cur.execute("select link,posted_at,subject,posted_by_id,class_time from query_links where section="+repr(pk)+" and class_day="+repr(date))
        # data = cur.fetchall()
        print("hiiiiiiiiiiiiiiiiiiiiiiii")
        obj = links.objects.filter(section=pk,class_day=date)
        serializer = linksSerializer(obj,many=True)
        return JsonResponse(serializer.data,safe=False)

class addAttendance(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        # try:
            con = connector.connect(host="localhost",user="root",password="akshay",database="querydb")
            cur = con.cursor()
            cur.execute("set sql_safe_updates=0")
            for i in request.data:
                print(i)
                if i['present']:
                    # print(i)
                    cur.execute("update query_studentuser set total_classes_attended=total_classes_attended+1 where rollno="+repr(i["username"]))
                    con.commit()
                    # cur.execute("update query_classwiseattendancestatus set get_status="+repr("present")+" where username="+repr(i["username"])+" and subject="+repr(i["subject"])+" and class_time="+repr(i["class_time"]))
                    obj = classWiseAttendanceStatus(username_id=i["username"],section=i['section'], subject=i["subject"],class_time=i["class_time"],get_status="present")                
                    obj.save()
                else:
                    # cur.execute("update query_classwiseattendancestatus set get_status="+repr("absent")+" where username="+repr(i["username"])+" and subject="+repr(i["subject"])+" and class_time="+repr(i["class_time"]))
                    obj = classWiseAttendanceStatus(username_id=i["username"],section=i['section'], subject=i["subject"],class_time=i["class_time"],get_status="absent")                
                    obj.save()
                cur.execute("update query_studentuser set total_classes=total_classes+1 where rollno="+repr(i['username']))
                con.commit()
            con.close()
            return JsonResponse({"msg":True})
        # except:
            # return JsonResponse({"msg":False})
        # pass

class teacherClassLinks(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self,request,pk):
        try:
            # con=connector.connect(host="localhost",user="root",password="akshay",database="querydb")
            # cur = con.cursor()
            # cur.execute("select * from query_teacheruser")
            obj = links.objects.filter(posted_by=pk,class_day=datetime.now().strftime("%Y-%m-%d"))
            serializer= linksSerializer(obj,many=True)
            return JsonResponse(serializer.data,safe=False)
        except:
            return JsonResponse({"msg":"error"})

class attendanceBlog(APIView):
    queryset=StudentUser.objects.all()
    serializer_class=StudentUserSerializer
    authentication_classes = [TokenAuthentication]
    filter_backends =[OrderingFilter,SearchFilter]
    search_fields =['section','username']
    def get_attendance(self,subject,username):
        # print("hii",subject,username)
        obj = classWiseAttendanceStatus.objects.filter(subject=subject,username_id=username,get_status="present")
        # print(len(obj))
        return len(obj)
    def post(self,request):
        # try:
            obj = StudentUser.objects.filter(section=request.data["section"])
            serializer = StudentUserSerializer(obj,many=True)
            total_classes = classWiseAttendanceStatus.objects.filter(section=request.data["section"],subject=request.data["subject"])
            ans=[]
            print(serializer.data)
            for i in serializer.data:
                i['total_classes_attended']=self.get_attendance(request.data["subject"],i["username"])
                i['total_classes']=len(total_classes)//len(obj)
                i['id']=i['rollno']
                ans.append(dict(i))
            print(ans)
            return JsonResponse(ans,safe=False)
        # except:
            # return JsonResponse({"msg":"error"})

class getAttendanceStatus(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self,request):
        try:
            obj = classWiseAttendanceStatus.objects.get(username=request.data["username"],class_time=request.data["class_time"],class_day=datetime.now().strftime("%Y-%m-%d"))
            serializer = classWiseAttendanceStatusSerializer(obj)
            return JsonResponse(serializer.data)
        except:
            return JsonResponse({"msg":"error"})
