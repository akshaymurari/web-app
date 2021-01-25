from django.contrib import admin
from .models import StudentUser,TeacherUser,StudentQuery,StudentQueryAnswer,TeacherQueryAnswer,links,classWiseAttendanceStatus,Events,TeacherQuery

@admin.register(StudentUser)
class StudentUserAdmin(admin.ModelAdmin):
    list_display = ['username','email','password','rollno','profile','datetime','gender',"lastloginat","total_classes_attended","total_classes","section"]

@admin.register(TeacherUser)
class TeacherUserAdmin(admin.ModelAdmin):
    list_display = ['username','email','password','profile','datetime',"gender","lastloginat"]

@admin.register(StudentQuery)
class StudentQueryAdmin(admin.ModelAdmin):
    list_display = ['created_by','title','description','posted_on']

@admin.register(StudentQueryAnswer)
class StudentQueryAnswerAdmin(admin.ModelAdmin):
    list_display = ['posted_by','title','answer','posted_on']

@admin.register(TeacherQuery)
class StudentQueryAdmin(admin.ModelAdmin):
    list_display = ['created_by','title','description','posted_on']

@admin.register(TeacherQueryAnswer)
class TeacherQueryAnswerAdmin(admin.ModelAdmin):
    list_display = ['posted_by','title','answer','posted_on']

@admin.register(links)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['posted_by','link','posted_at',"section",'subject','class_time','class_day','attendance_taken']

@admin.register(classWiseAttendanceStatus)
class ClassWiseAttendanceStatusAdmin(admin.ModelAdmin):
    list_display = ['username','class_day','class_time','subject','get_status','section','posted_by','link']

@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = ['EventName',"posted_time","Event_on"]