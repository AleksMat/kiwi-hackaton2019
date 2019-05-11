import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, reaction } from 'mobx';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import _ from 'lodash';

import './map.css';


@inject('uiStore')
@observer
class Map extends Component {
  @observable lat = 30;
  @observable lng = 0;
  @observable zoom = 0;

  constructor(props) {
    super(props);

    this.minOverlayZoom = 10;
    this.selectZoomLevel = 15;

    this.mainMap = null;
    this.overlayMap = null;
    this.locationMarkers = [];

    reaction(
      () => this.props.uiStore.state.locationsUpdated,
      () => {
        if (this.props.uiStore.state.locationsUpdated) {
          this.setLocations();
        }
      },
    );
  }

  zoomChanged = () => {
    var zoom = this.mainMap.getZoom();
    if (zoom >= this.minOverlayZoom) {
      this.overlayMap.addTo(this.mainMap);
    } else {
      this.mainMap.removeLayer(this.overlayMap)
    }

    this.props.uiStore.state.zoomLevel = zoom;
    this.props.uiStore.updateLocations(this.mainMap.getBounds());
  }

  setOverlayMap = () => {

    this.overlayMap = L.tileLayer.wms('http://services.sentinel-hub.com/ogc/wms/f660b35a-140b-4592-aa0a-6c16fe6cc0ac', {
      layers: 'TRUE-COLOR-S2-L1C',
      maxcc: '100',
      showlogo: 'false',
      time: '2019-01-01/2019-06-01',
      priority: 'leastCC',
      tileSize: 512,
      minZoom: this.minOverlayZoom,
      maxZoom: 20
    });

    this.mapControls = L.control.layers(null, {'Sentinel-2': this.overlayMap}).addTo(this.mainMap);

  };

  setLocations = () => {

    if (this.locationMarkers) {
      this.locationMarkers.forEach(marker => {
        this.mainMap.removeLayer(marker);
      })
    }

    this.locationMarkers = [];
    var myIcon = new L.Icon({
      iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
      iconAnchor: [16, 37]
    })
    this.props.uiStore.state.locations.forEach(location => {
      let marker = L.marker([location.lat, location.lng], {icon: myIcon})

      marker.addTo(this.mainMap).on('click', this.markerClicked)

      this.locationMarkers.push(marker)
    });

    this.props.uiStore.state.locationsUpdated = false;
  }

  markerClicked = (e) => {
    let latlng = e.latlng;

    this.props.uiStore.state.locations.forEach(location => {
      if (latlng.lat === location.lat && latlng.lng === location.lng) {
        this.props.uiStore.selectLocation(location.id);
        this.mainMap.setView([location.lat, location.lng], this.selectZoomLevel);
        return
      }
    })
  }

  componentDidMount() {
    const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    });
  
    this.mainMap = L.map('map', {
      minZoom: 3,
      layers: [carto],
      maxZoom: 17,
      zoomControl: false, // this disables classical zoom buttons
    });
  
    this.setOverlayMap();
  
    this.mainMap.on('moveend', _.throttle(() => {}), 4000);
    this.mainMap.on('resize', () => {});
    this.mainMap.on('zoomend', () => {
      this.zoomChanged();
    });
    
    L.control
      .scale({
        updateWhenIdle: true,
        imperial: false,
        position: 'bottomright',
      })
      .addTo(this.mainMap);
    
    this.mainMap.setView([this.lat, this.lng], this.zoom);

    this.setLocations();
  }

  render() {
    const {
      state: {
        locations
      }
    } = this.props.uiStore;

    return (
      <div id="mapWrap">
        <div id="map" />
      </div>
    );
  }
}

export default Map;
