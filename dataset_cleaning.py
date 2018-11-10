import csv

result = []

with open('Market_Basket_Optimisation.csv', 'r') as f:
    reader = csv.reader(f, delimiter=',')
    for row in reader:
        line = set(row)
        result.append(list(line))
f.close()

with open('New_Dataset.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(result)