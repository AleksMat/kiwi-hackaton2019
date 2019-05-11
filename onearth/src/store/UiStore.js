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
      locationSelected: false,
      locationInfo: {},
      locations: [{'lat': 45, 'lng': 20}]
    };
  }

}
export default UiStore;
