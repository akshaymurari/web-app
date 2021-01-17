from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from query import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('studentStore',views.student,basename='student')
router.register('teacherStore',views.teacher,basename='teacher') 
router.register('addClassLinks',views.addClassLinks,basename='teacher') 
urlpatterns = [
    path('',include(router.urls)),
    path('forgetpassword/',views.forgetpassword.as_view()),
    path('studentexists/',views.studentexists.as_view()),
    path('teacherexists/',views.teacherexists.as_view()),
    path('classLinkBlog/<str:pk>',views.classLinkBlog.as_view()),
    path('addAttendance/',views.addAttendance.as_view()),
    path('auth/',include('rest_framework.urls',namespace='rest_framework')),
    path('admin/', admin.site.urls),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
