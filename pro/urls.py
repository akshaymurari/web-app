from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from query import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('studentStore',views.student,basename='student')
router.register('teacherStore',views.teacher,basename='teacher') 
router.register('addClassLinks',views.addClassLinks,basename='addlinks') 
router.register('PostQueryQ',views.QueryBlogQ,basename='querypost') 
router.register('PostQueryA',views.QueryBlogA,basename='queryanswerpost') 
# router.register('PostQueryA/',views.QueryBlogA,basename='queryanswerpost') 
router.register('EventsBlog',views.EventsBlog,basename='events') 
router.register('NotificationBlogG',views.NotificationBlogG,basename='notifications') 

urlpatterns = [
    path('',include(router.urls)),
    path('GetQueryQ/<str:pk>/',views.GetQueryQ.as_view({'get': 'list'})),
    path('GetQueryA/<str:pk>/',views.GetQueryA.as_view({'get': 'list'})),
    # path('GetQueryQ/<str:pk>/',views.QueryBlogAQ.as_view()),
    path('getNotificationResponse/',views.getNotificationResponse.as_view()),
    path('getNotifications/',views.getNotifications.as_view()),
    path('forgetpassword/',views.forgetpassword.as_view()),
    path('teacherClassLinks/<str:pk>',views.teacherClassLinks.as_view()),
    path('filterClassLinkBlogByUsername/<str:pk>',views.filterClassLinkBlogByUsername.as_view()),
    path('attendanceBlog/',views.attendanceBlog.as_view()),
    path('studentexists/',views.studentexists.as_view()),
    path('teacherexists/',views.teacherexists.as_view()),
    path('classLinkBlog/<str:pk>',views.classLinkBlog.as_view()),
    path('getTotalAttendance/<str:pk>',views.getTotalAttendance.as_view()),
    path('onSearchLinkBlog/',views.onSearchLinkBlog.as_view()),
    path('classLinkBlog/',views.classLinkBlog.as_view()),
    path('addAttendance/',views.addAttendance.as_view()),
    path('getAttendanceStatus/',views.getAttendanceStatus.as_view()),
    path('deleteClassLinks/',views.deleteClassLinks.as_view()),
    path('auth/',include('rest_framework.urls',namespace='rest_framework')),
    path('admin/', admin.site.urls),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
