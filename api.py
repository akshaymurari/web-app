import requests
import json
# r=requests.delete(url='http://127.0.0.1:8000/student/akshaymurarill/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"})
# print(r.json())
r=requests.post(url='http://127.0.0.1:8000/studentStore/',headers={"content-type": "application/json","Authorization":"token de5fca1fb449f586b63136af9a12ab5afc96602e"},data=json.dumps({'username':"aksha","email":"akshaymurari184@gmail.com","type":"student","rollno":588}))
print(r.json())