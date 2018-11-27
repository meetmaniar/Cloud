import json

def convert(filename):
    with open(filename) as f:
        result = {}
        for row in f:
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


if __name__ == "__main__":
    print(convert("base_dataset.json"))