import requests

destinations = {}
with open("Locations-top vacation location - Locations-top vacation location.csv", "rb") as csvfile:
    #print(csvfile.read())

    #if byte in line:
    #content = csvfile.read().decode("utf-8")
    #print(content)
    #lines = csv.reader()
    next(csvfile)
    for line in csvfile:
        if len(line)<10:
            continue
        try:
            line = line.decode("utf-8").replace("\r\n", "").split(",")
            line[-3] = line[-3].replace('"', "")
            # print(line[15], line[-3], line[-2])
            destinations[line[0]] = [float(line[1].replace('"',"")), float(line[2].replace('"',""))]
        except UnicodeDecodeError:
            #print("cannot decode oxff")
            #print(line)
            pass
        except ValueError:
            pass

def get_destinations(lat1, log1, lat2, log2):
    matching = destinations.copy()
    for name in destinations:
        if not (lat1 < destinations[name][0] and destinations[name][0] < lat2 and log1 < destinations[name][1] and destinations[name][1] < log2):
            matching.pop(name)
    return matching

def get_destiantion_info(id):
    return destinations[id][-1]

print(get_destinations(4.5,52,5,53))

url = "https://kiwicom-prod.apigee.net/v2/search"

parameters = {"fly_from": "LJU", "fly_to": "TNR"}

headers= {"apikey": "SsdTNP2YqAg5Xk89VKgAbBEk1zC8sOAN"}

response = requests.get(
    url,
    params=parameters,
    headers=headers,
)

print(response.json()["data"][0]["price"])