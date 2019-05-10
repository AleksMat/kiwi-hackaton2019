import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, reaction } from 'mobx';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
import _ from 'lodash';

import './map.css';


@inject('uiStore')
@observer
class Map extends Component {
  @observable lat = 45;
  @observable lng = 13;
  @observable zoom = 0;

  constructor(props) {
    super(props);

  }

  

  render() {
    
    return (
      <div id="mapWrap">
        <div id="map" />
      </div>
    );
  }
}

export default Map;
