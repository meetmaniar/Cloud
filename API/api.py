import csv
import datetime
from flask import Flask, request, jsonify, Response, abort
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import subprocess
import json
import pymongo
import os.path

JAVA_FILENAME = "wordCount-scala-0.0.1-SNAPSHOT-jar-with-dependencies.jar"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
auth = HTTPBasicAuth()

MYCLIENT = pymongo.MongoClient("mongodb://localhost:27017/")
DB = MYCLIENT["testdatabase"]


def run_java(filename):
    print('running java file')
    subprocess.run(['java', '-jar', JAVA_FILENAME, filename])


def convert(filename):
    with open(filename) as f:
        print('------converting dataset processing result into json-------------------')
        result = {}
        for row in f:
            print(row)
            new_row = row.split('|')
            key = new_row[0].strip('[]')
            value = new_row[1].strip('[]\n')
            if key in result:
                result[key].append(value)
            else:
                result[key] = [value]
            # print(result, row)
    f.close()
    return json.dumps(result)


def json_to_db(json_file_name, db_collection_name):
    collection = DB[db_collection_name]
    data = json.loads(convert(json_file_name))
    query = {'client_data': data}
    print(query)
    result = collection.update({'type':'dataset'},{'$set':query})
    print(result)
    return result['updatedExisting']




@auth.verify_password
def verify_password(client_email, password):
    user_collection = DB['users']
    result = user_collection.find({'client_email': client_email})
    if result.count() == 0:
        return False
    else:
        return True


@app.route("/")
def test():
    return "API up and running"


@app.route("/register", methods=['POST'])
def register():
    data = json.loads(request.data)
    print(data)

    client_name = data['client_name']
    client_email = data['client_email']
    print(client_name, client_email)
    print(DB.list_collection_names())
    if client_name + "_dataset" in DB.list_collection_names():
        return Response("Username is already in use", 401)

    user_collection = DB['users']
    user_emails = user_collection.find({'client_email': client_email})
    if user_emails.count() != 0:
        return Response("Already registered using this email", 401)

    print(DB['users'].insert({'client_email':client_email, 'client_name': client_name, 'registration_time': datetime.datetime.utcnow()}))

    collection = DB[client_name + '_dataset']
    base_dataset = DB['base_dataset'].find({'type':'dataset'}, {'client_data':1})[0]['client_data']

    for x in base_dataset:
        print(x)

    first_ = {'client_email': client_email,
              'client_data': base_dataset,
              'type': 'dataset'}
    result = collection.insert_one(first_)
    print(result)

    return Response("Registration complete", 200)


@app.route("/login", methods=['GET'])
@auth.login_required
def login():
    client_email = auth.get_auth()['username']
    # print(client_email)
    client_name = DB['users'].find({'client_email':client_email},{'client_name':1})[0]['client_name']

    return Response(json.dumps({'client_name':client_name}), 200)


@app.route("/relatedproducts", methods=['POST'])
@auth.login_required
def related_product():
    data = json.loads(request.data)
    client_name = data['client_name']
    collection = DB[client_name + '_dataset']
    # query = {"client_name": client_name}
    # print(query)
    documents = collection.find({},{'client_data':1})[0]['client_data']
    print(documents)

    items = data['items']
    result = {}
    for item in items:
        try:
            alist = documents[item]
            result[item] = alist
        except KeyError:
            result[item] = None
    print('result:', result)
    return Response(json.dumps(result), 200)


@app.route("/update", methods=['POST'])
@auth.login_required
def update():
    data = json.loads(request.data)
    client_name = data['client_name']
    collection = DB[client_name + '_dataset']
    documents = collection.find({},{'client_data':1})[0]['client_data']

    return Response(json.dumps(documents), 200)


@app.route("/submitdata", methods=['POST'])
@auth.login_required
def submit_data():
    data = json.loads(request.data)
    submission_data = data['data']
    client_name = data['client_name']
    filename = client_name + "_dataset.csv"

    # update user specific csv file
    # if file doesn't exit, create one by copying & renaming the base dataset csv file, then update the new file
    if not os.path.isfile(filename):
        copy_rename_file_command = 'cp base_dataset.csv ' + filename
        print('Creating new dataset csv', copy_rename_file_command)
        os.system(copy_rename_file_command)
    with open(filename, 'a') as csvfile:
        writer = csv.writer(csvfile)
        for row in submission_data:
            print(row)
            writer.writerow(row)
    csvfile.close()

    # run java file for new dataset to generate new association rules json file
    run_java(filename)

    # parse new json file
    result = json_to_db('base_dataset.json', client_name + '_dataset')

    if result:
        print('Update success on submitted data')
        collection = DB[client_name + '_dataset']
        new_dataset = collection.find({'type':'dataset'}, {'client_data':1})[0]['client_data']
        return Response(json.dumps(new_dataset), 200)
    else:
        return Response('Unable to update dataset', 500)


# app.run(host='localhost', port=80, debug=False, threaded=True)
app.run(host='0.0.0.0', port=80, debug=False, threaded=True)
