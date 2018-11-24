import json
import pymongo

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


MYCLIENT = pymongo.MongoClient("mongodb://localhost:27017/")
DB = MYCLIENT["testdatabase"]
collection = DB['base_dataset']


json_data = convert('base_dataset.json')
result = collection.insert({'client_data':json.loads(json_data), 'type':'dataset'})
print(result)
