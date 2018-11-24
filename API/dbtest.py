import pymongo
import json
from pprint import pprint

# with open('base_dataset.json','r') as file:
#     data = json.load(file)
# file.close()
# data = data[0]
#
# final_data = {}
# for key in data:
#     print(str(key)[1:-1])
#     print(data[key])

# pprint(data)


myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["testdatabase"]

mycol = mydb["dataset"]

mylist = {
    "client_name": "felicia",
    "client_data": [
        "rabbit", "dog heel"
    ]
}

x = mycol.insert(mylist)
print(x)

myquery = { "client_name": "???", }

mydoc = mycol.find(myquery)

print(mydoc.count())
for x in mydoc:
    print(x)
