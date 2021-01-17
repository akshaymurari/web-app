import requests
import json
# r=requests.delete(url='http://127.0.0.1:8000/student/akshaymurarill/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# print(r.json())
# r=requests.get(url='http://127.0.0.1:8000/classLinkBlog/s1',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
r=requests.post(url='http://127.0.0.1:8000/addAttendance/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=json.dumps([{'username':'588','present':False},{'username':'19H51A0588','present':True}]))
print(r.json())