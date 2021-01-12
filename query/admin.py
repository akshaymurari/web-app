from django.contrib import admin
from .models import StudentUser,TeacherUser,StudentQuery,StudentQueryAnswer,TeacherQueryAnswer
# Register your models here.
@admin.register(StudentUser)
class StudentUserAdmin(admin.ModelAdmin):
    list_display = ['username','email','password','rollno','profile','datetime','gender']
@admin.register(TeacherUser)
class TeacherUserAdmin(admin.ModelAdmin):
    list_display = ['username','email','password','profile','datetime']
@admin.register(StudentQuery)
class StudentQueryAdmin(admin.ModelAdmin):
    list_display = ['created_by','query','datetime']
@admin.register(StudentQueryAnswer)
class StudentQueryAnswerAdmin(admin.ModelAdmin):
    list_display = ['posted_by','answer','datetime']
@admin.register(TeacherQueryAnswer)
class TeacherQueryAnswerAdmin(admin.ModelAdmin):
    list_display = ['posted_by','answer','datetime']