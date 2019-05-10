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
      destinationSelected: false,
    };
  }

}
export default UiStore;
