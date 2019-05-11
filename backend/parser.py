import requests

destinations = {}
with open("Locations-top vacation location - Locations-top vacation location.csv", "rb") as csvfile:

    next(csvfile)
    for line in csvfile:
        if len(line)<10:
            continue
        try:
            line = line.decode("utf-8").replace("\r\n", "").split(",")
            line[-3] = line[-3].replace('"', "")
            destinations[line[0]] = [float(line[1].replace('"',"")), float(line[2].replace('"',""))]
        except UnicodeDecodeError:
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


# print(get_destinations(4.5,52,5,53))

kiwi_url = "https://kiwicom-prod.apigee.net/v2/search"


headers = {"apikey": "SsdTNP2YqAg5Xk89VKgAbBEk1zC8sOAN"}

locations_url = "https://kiwicom-prod.apigee.net/locations/radius"


def get_flight_price(lat=0, lon=0):
    if lat != 0 and lon != 0:
        start = get_closest_airport(lat, lon)
    else:
        start = "LJU"
    parameters = {"fly_from": start, "fly_to": "TNR"}
    response = requests.get(
        kiwi_url,
        params=parameters,
        headers=headers,
    )
    return response.json()["data"][0]["price"]


def get_closest_airport(lat, lon):
    parameters = {
        "lat": lat, "lon": lon,
        "location_types": "airport"
    }
    response = requests.get(
        locations_url,
        params=parameters,
        headers=headers,
    )
    return response.json()["locations"][0]["id"]