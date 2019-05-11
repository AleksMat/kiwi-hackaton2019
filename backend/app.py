"""
Main module where service is implemented
"""

from flask import Flask, request
from flask_restplus import Resource, Api


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


RESPONSES = {
    200: 'Success',
    400: 'Incorrect request parameters',
    500: 'Internal error'
}


@api.route('/locations')
@api.doc(responses=RESPONSES)
class LocationsProvider(Resource):

    @api.response(200, 'Success')
    def get(self):
        """ Provides all locations in given area
        """
        args = self.args
        print(args)

        # payload = get_destinations(lat1, log1, lat2, log2)

        # return payload, 200


@api.route('/locations/<string:{}>')
@api.doc(responses=RESPONSES)
class DescriptionProvider(Resource):

    @api.response(200, 'Success')
    def get(self, location_id):
        """ Obtain info about a location
        """
        payload = get_destiantion_info(int(location_id))

        return payload, 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)