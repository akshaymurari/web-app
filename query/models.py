from django.db import models


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
    lastloginat = models.DateTimeField(auto_now=True)


class links(models.Model):
    posted_by = models.ForeignKey(TeacherUser,on_delete=models.CASCADE)
    link = models.CharField(max_length=100)
    posted_at = models.DateTimeField(auto_now_add=True)
    section = models.CharField(max_length=5)
    subject = models.CharField(max_length=20)
    class_time = models.CharField(max_length=10)
    class_day = models.DateField(auto_now=True)
    
class StudentQuery(models.Model):
    created_by = models.ForeignKey(StudentUser, on_delete=models.PROTECT)
    query = models.TextField()
    datetime = models.DateTimeField(auto_now_add=True)

class StudentQueryAnswer(models.Model):
    posted_by = models.ForeignKey(StudentUser, on_delete=models.PROTECT)
    answer = models.TextField()
    datetime = models.DateTimeField(auto_now_add=True)

class TeacherQueryAnswer(models.Model):
    posted_by = models.ForeignKey(TeacherUser, on_delete=models.PROTECT)
    answer = models.TextField()
    datetime = models.DateTimeField(auto_now_add=True)

class classWiseAttendanceStatus(models.Model):
    username = models.ForeignKey(StudentUser,on_delete=models.PROTECT)
    class_day = models.DateField(auto_now=True)
    subject = models.CharField(max_length=20)
    class_time = models.CharField(max_length=10)
    get_status = models.CharField(max_length=10,default="attendance not taken")