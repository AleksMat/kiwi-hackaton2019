"""
Main module where service is implemented
"""

from flask import Flask, request
from flask_restplus import Resource, Api
from flask_cors import CORS


# from utils import get_flask_schema, recursive_camelize
# from schemas import TaskSchema, TaskOverviewSchema
# from tasks import task_list, get_schedule_payload
from parser import get_destinations, get_destiantion_info


__version__ = '0.0.1'

app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config['RESTPLUS_MASK_SWAGGER'] = False

api = Api(
    app,
    title='onEarth backend',
    description='Provides info about locations and flight prices',
    version=__version__,
    contact='matej.aleksandrov@gmail.com',
    default_label='version {}'.format(__version__),
    doc='/docs'
)

CORS(app, resources={r"/*": {"origins": "*"}})

RESPONSES = {
    200: 'Success',
    400: 'Incorrect request parameters',
    500: 'Internal error'
}


@api.route('/locations')
@api.doc(responses=RESPONSES)
class LocationsProvider(Resource):
    """
    curl "http://127.0.0.1:5000/locations?lat1=0.0&lng1=0.0&lat2=30.0&lng2=40.0"
    """
    @api.response(200, 'Success')
    def get(self):
        """ Provides all locations in given area
        """
        lat1, lat2 = float(request.args['lat1']), float(request.args['lat2'])
        lng1, lng2 = float(request.args['lng1']), float(request.args['lng2'])
        lat1, lat2 = min(lat1, lat2), max(lat1, lat2)
        lng1, lng2 = min(lng1, lng2), max(lng1, lng2)

        payload = get_destinations(lat1, lng1, lat2, lng2)

        return payload, 200


@api.route('/locations/<string:location_id>')
@api.doc(responses=RESPONSES)
class DescriptionProvider(Resource):
    """
    curl "http://127.0.0.1:5000/locations/1"
    """
    @api.response(200, 'Success')
    def get(self, location_id):
        """ Obtain info about a location
        """
        payload = get_destiantion_info(int(location_id))

        print(payload)
        return payload, 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
