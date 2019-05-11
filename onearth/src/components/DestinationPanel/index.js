import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import s from 'styled-components';
import { debounce } from 'lodash';

import './destination.css';

@inject('uiStore')
@observer
class DestinationPanel extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      state: {
        locationSelected,
        locationInfo: {
          name,
          description,
          price
        }
      }
    } = this.props.uiStore;

    return (
      <div className="destinationWrap">
          <div className="section-2">
            <h1 className="heading-2">Location: {name}
            </h1>
            <div className="container-description">
              <h2 className="heading-3">Description</h2>
              <p className="paragraph">{description}</p>
            </div>
            </div>
            <div className="travel">
              <h1 className="heading-2">Travel</h1>
              <div className="flight-container"></div>
            </div>
            <div className="Insight">
              <h1 className="heading-2">Insight</h1>
              <div className="gif-container"></div>
              <div className="columns w-row" ><img src="https://raw.githubusercontent.com/AleksMat/kiwi-hackaton2019/master/data/Sentinel-2_L1C-timelapse-etna.gif" className="hero-gif" />
                <table>
                  <tbody>
                    <tr>
                      <th><img src="https://raw.githubusercontent.com/AleksMat/kiwi-hackaton2019/master/data/api-volcano-from-space-aerial-nasa.jpg" className="hero-img"/></th>
                      <th><img src="https://raw.githubusercontent.com/AleksMat/kiwi-hackaton2019/master/data/etna2.jpg" className="hero-img"/></th>
                      <th><img src="https://raw.githubusercontent.com/AleksMat/kiwi-hackaton2019/master/data/mt-etna-sicily-italy-volcano-from-space-aerial-nasa.jpg" className="hero-img"/></th>
                    </tr>
                    </tbody>
                </table>
              </div>
            </div>
        </div>
    );
  }
}

export default DestinationPanel;
