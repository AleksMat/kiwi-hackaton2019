import requests

MAX_DESTIONATIONS = 10


def read_destinations():
    dest = []
    with open("Locations-top vacation location - Locations-top vacation location.tsv", "rb") as tsvfile:

        next(tsvfile)
        for idx, line in enumerate(tsvfile):

            if len(line) < 10:
                continue
            try:
                line = line.decode("utf-8").replace("\r\n", "").strip().split('\t')
                name = line[0]
                coordinates = line[1].split(",")
                urls = line[2: -1]
                description = line[-1]
                if description.startswith("http"):
                    description = "Currently unavailable"
                    urls = line[2:]
                dest.append({
                    'name': name,
                    'id': idx,
                    'lng': float(coordinates[0]),
                    'lat': float(coordinates[1]),
                    'urls': urls,
                    'description': description
                })
                if idx < 5:
                    lng = dest[-1]["lng"]
                    dest[-1]["lng"] = dest[-1]["lat"]
                    dest[-1]["lat"] = lng
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
    print(lat, lng)
    return {
        **destinations[id],
        # 'price': get_flight_price(lat, lng),
        'airport': get_closest_airport(lat, lng)
    }


# print(get_destinations(4.5,52,5,53))

kiwi_url = "https://kiwicom-prod.apigee.net/v2/search"

headers = {"apikey": "SsdTNP2YqAg5Xk89VKgAbBEk1zC8sOAN"}

locations_url = "https://kiwicom-prod.apigee.net/locations/radius"


def get_flight_price(lat=0, lon=0):
    if lat != 0 and lon != 0:
        airports = get_closest_airport(lat, lon, False)
    else:
        airports = {"id": "LJU"}

    for start in airports:
        start = start["id"]
        parameters = {"fly_from": start, "fly_to": "TNR"}
        response = requests.get(
            kiwi_url,
            params=parameters,
            headers=headers,
        )
        if len(response.json()["data"]) > 0:
            return response.json()["data"][0]["price"]
    return 999


def get_closest_airport(lat, lon, single_location=True):
    radius = 250

    while radius < 10 ** 4:
        parameters = {
            "lat": lat, "lon": lon,
            "location_types": "airport",
            "radius": radius
        }
        locations = requests.get(
            locations_url,
            params=parameters,
            headers=headers,
        ).json()["locations"]

        if locations:
            if single_location:
                return locations[0]["id"]
            else:
                return locations
        radius *= 2

    raise ValueError('Something does not work')


destinations = read_destinations()
