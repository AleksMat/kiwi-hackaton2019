import requests

MAX_DESTIONATIONS = 10


def read_destinations():
    dest = []
    with open("Locations-top vacation location - Locations-top vacation location.csv", "rb") as csvfile:

        next(csvfile)
        for idx, line in enumerate(csvfile):
            if len(line) < 10:
                continue
            try:
                line = line.decode("utf-8").replace("\r\n", "").split(",")
                line[-3] = line[-3].replace('"', "")
                dest.append({
                    'name': line[0],
                    'id': idx,
                    'lng': float(line[1].replace('"', "")),
                    'lat': float(line[2].replace('"', ""))
                })
            except UnicodeDecodeError:
                pass
            except ValueError:
                pass

    return dest


def get_destinations(lat1, lng1, lat2, lng2):
    matching = []

    for dest in destinations:
        if lat1 < dest['lat'] < lat2 and lng1 < dest['lng'] < lng2:

            d = {}
            for key in ['id', 'lat', 'lng', 'name']:
                d[key] = dest[key]

            matching.append(d)

        if len(matching) >= MAX_DESTIONATIONS:
            break

    return matching


def get_destiantion_info(id):
    lat, lng = destinations[id]['lat'], destinations[id]['lng']
    return {
        **destinations[id],
        'price': get_flight_price(lat, lng),
        # 'airport': get_closest_airport(lat, lng)
    }


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


destinations = read_destinations()
