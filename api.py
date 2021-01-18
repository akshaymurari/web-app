import requests
import json
from datetime import datetime
data=json.dumps({"posted_by":"akshaymurari","link":"link1","section":"s1","subject":"maths","class_time":"14:00","class_day":"2021-01-19"})
# data=json.dumps({'username':"akshaymurari",'password':'akshayt','email':'akshaymurari184@gmail.com','lastloginat':"13:42",'type':"student"})
# r=requests.delete(url='http://127.0.0.1:8000/student/akshaymurarill/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# print(r.json())
# r=requests.get(url='http://127.0.0.1:8000/classLinkBlog/s3',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# r=requests.post(url='http://127.0.0.1:8000/getAttendanceStatus/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=json.dumps({'username':'19H51A0588','class_time':'12:00'}))
# r=requests.post(url='http://127.0.0.1:8000/addClassLinks/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=data)
# r=requests.delete(url='http://127.0.0.1:8000/deleteClassLinks/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=data)
# r=requests.get(url='http://127.0.0.1:8000/teacherClassLinks/akshaymurari',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# r=requests.get(url='http://127.0.0.1:8000/attendanceBlog/s1',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# r=requests.post(url='http://127.0.0.1:8000/forgetpassword/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=data)

print(r.json())