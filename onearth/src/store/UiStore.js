import { observable, action, computed } from 'mobx';
import _ from 'lodash';

class UiStore {
  @observable state;
  @observable task;

  constructor() {
    this.initStore();
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
  updateLocations(bounds) {
    let se = bounds.getSouthWest()
    let nw = bounds.getNorthEast()

    console.log(se.lat, se.lng, nw.lat, nw.lng)
    // TODO: call service
    this.state.locations.push({lat: -45, lng: 13, id: 3})

    this.state.locationsUpdated = true
  }

  @action
  selectLocation(id) {
    console.log(id, '!!!')
  }

}
export default UiStore;
