from django.db import models
from datetime import datetime
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class StudentUser(models.Model):
    username = models.CharField(max_length=30,primary_key=True)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=40,unique=True)
    rollno = models.CharField(max_length=10,unique=True)
    profile = models.ImageField(default='360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',upload_to='')
    datetime = models.DateTimeField(auto_now_add=True)
    gender = models.IntegerField(default=1)
    lastloginat = models.CharField(max_length=30)
    total_classes_attended = models.IntegerField(default=0)
    total_classes = models.IntegerField(default=0)
    section = models.CharField(max_length=10,default=None)

class TeacherUser(models.Model):
    username = models.CharField(max_length=30,primary_key=True)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=40,unique=True)
    datetime = models.DateTimeField(auto_now_add=True)
    profile = models.ImageField(default='360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',upload_to='')
    gender = models.IntegerField(default=1)
    lastloginat = models.CharField(max_length=30)


class links(models.Model):
    posted_by = models.ForeignKey(TeacherUser,on_delete=models.CASCADE)
    link = models.CharField(max_length=100)
    posted_at = models.DateTimeField(auto_now_add=True)
    section = models.CharField(max_length=5)
    subject = models.CharField(max_length=20)
    class_time = models.CharField(max_length=30)
    class_day = models.DateField(default=datetime.now().strftime("%Y-%m-%d"))
    attendance_taken = models.BooleanField(default=False)

class StudentQuery(models.Model):
    created_by = models.ForeignKey(StudentUser, on_delete=models.PROTECT)
    title = models.CharField(max_length=20,primary_key=True)
    description = models.TextField(default=None)
    posted_on = models.DateTimeField(auto_now_add=True)

class StudentQueryAnswer(models.Model):
    posted_by = models.ForeignKey(StudentUser, on_delete=models.PROTECT)
    title = models.ForeignKey(StudentQuery,on_delete=models.CASCADE)
    answer = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)

class TeacherQuery(models.Model):
    created_by = models.ForeignKey(TeacherUser, on_delete=models.PROTECT)
    title = models.CharField(max_length=20,primary_key=True)
    description = models.TextField(default=None)
    posted_on = models.DateTimeField(auto_now_add=True)

class TeacherQueryAnswer(models.Model):
    posted_by = models.ForeignKey(TeacherUser, on_delete=models.PROTECT)
    title = models.ForeignKey(TeacherQuery, on_delete=models.CASCADE)
    answer = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)

    
class classWiseAttendanceStatus(models.Model):
    username = models.ForeignKey(StudentUser,on_delete=models.PROTECT)
    posted_by=models.ForeignKey(TeacherUser, on_delete=models.PROTECT,default=None)
    class_day = models.DateField()
    subject = models.CharField(max_length=20,default=None)
    class_time = models.CharField(max_length=30,default=None)
    get_status = models.CharField(max_length=30,default=None)
    section = models.CharField(max_length=10,default=None)
    link = models.CharField(max_length=255,default=None)

class Events(models.Model):
    EventName = models.CharField(max_length=255)
    posted_time = models.DateTimeField(auto_now_add=True)
    Event_on = models.DateField(default=None)

#updating query blog linking student and teacher together
class QueryBlog(models.Model):
    posted_by = models.CharField(max_length=255)
    type = models.CharField(max_length=30,default=None)
    title = models.CharField(max_length=20,primary_key=True)
    description = models.TextField(default=None)
    posted_on = models.DateTimeField(auto_now_add=True)

class QueryAnswerBlog(models.Model):
    posted_by = models.CharField(max_length=255)
    title = models.ForeignKey(QueryBlog, on_delete=models.CASCADE)
    type = models.CharField(max_length=30,default=None)
    answer = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)