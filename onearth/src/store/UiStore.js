import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import axios from 'axios';

class UiStore {
  @observable state;
  @observable task;

  constructor() {
    this.initStore();

    this.backendService = new axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  @action
  initStore() {
    this.appConfig = {
    };

    this.state = {
      zoomLevel: null,
      locationSelected: false,
      locationInfo: {
        name: 'Test destination',
        description: 'Something about destination',
        price: '5 $'
      },
      locations: [{lat: 45, lng: 13, id: 1}, {lat: 30, lng: 23, id: 2}],
      
      locationsUpdated: false
    };
  }

  @action
  async updateLocations(bounds) {
    let sw = bounds.getSouthWest()
    let ne = bounds.getNorthEast()

    let { data } = await this.backendService.get(`/locations?lat1=${sw.lat}&lng1=${sw.lng}&lat2=${ne.lat}&lng2=${ne.lng}`)

    console.log(data)
    this.state.locations = data

    this.state.locationsUpdated = true
  }

  @action
  async selectLocation(id) {
    let { data } = await this.backendService.get(`/locations/${id}`);

    this.state.locationInfo = data
  }

}
export default UiStore;
