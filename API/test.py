import csv
import os

import requests
import json
import pymongo

base_url = "http://18.219.177.175"
# base_url = "http://localhost"
VERSION = "1"
data = {
    'salmon':['cat food'],
    'eggs': ['mineral water', 'strawberry', 'cheese cake', 'conditioner']
}

products = {
    'client_name': 'jenny_test'+VERSION,
    'data': [['eggs', 'dog food', 'salmon']]
}
#
# MYCLIENT = pymongo.MongoClient("mongodb://localhost:27017/")
# DB = MYCLIENT["testdatabase"]
# collection = DB['base_dataset']
# query = {'client_data': data, 'type': 'dataset'}
# # result = collection.update({'type':'dataset'},{'$set':query})
# result = collection.insert(query)
# print(result)
#
# result = collection.find({},{'_id':1})
# for x in result:
#     print(x)

req = requests.get(base_url)
print(req.content)
#
r = requests.post(base_url+"/submitdata", data=json.dumps(products), auth=('962887107@qq.com', 'wot'))
# r = requests.get(base_url+"/login", auth=('962887107@qq.com', 'wot'))
# r = requests.post(base_url+"/register", data=json.dumps({"client_name": "jenny_test1", "client_email": "962887107@qq.com"}))
print(json.loads(r.content))

# submission_data = [
#     ['dog food', 'watermelon', 'peaches'],
#     ['mineral water', 'strawberry', 'cheese cake', 'conditioner']
# ]
# filename = "jenny_test1_dataset.csv"
# if not os.path.isfile(filename):
#     copy_rename_file_command = 'cp Market_Basket_Optimisation.csv ' + filename
#     os.system(copy_rename_file_command)
# with open(filename, 'a') as csvfile:
#     writer = csv.writer(csvfile)
#     for row in submission_data:
#         writer.writerow(row)
#
# json_data = convert('base_dataset.json')
# result = collection.insert({'client_data':json.loads(json_data), 'type':'dataset'})
# print(result)