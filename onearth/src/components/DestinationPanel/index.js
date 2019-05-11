import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Helmet} from "react-helmet"

import './destination.css';

@inject('uiStore')
@observer
class DestinationPanel extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      locationSelected,
      state: {
        locationInfo: {
          name,
          description,
          airport,
          urls
        }
      }
    } = this.props.uiStore;

    if (! locationSelected){
      return null
    }

    return (
      <div className="destinationPanel" >
      <div className="destinationWrap">
          <div className="section-2">
            <h1 className="heading-2">Location: {name}
            </h1>
            <div className="container-description">
              <h2 className="heading-3">Description</h2>
              <p className="paragraph">{description}</p>
            </div>
            </div>
            {airport && <div className="travel">
              <h1 className="heading-2">Travel</h1>
              <div className="flight-container">
              <div id="widget-holder"></div>
                  <Helmet>
                  <script data-affilid="sinergisewidget" data-from="Ljubljana" 
                  data-to={airport} data-departure="2019-05-17" data-width="100%"
                  data-apigee-key="27W4h6f0VrTIAscCqAFIALTdlIzk7BY4" data-results-only="true"
                  src="https://widget.kiwi.com/scripts/widget-search-iframe.js"></script>
                  </Helmet>
              </div>
            </div>}
            {urls  && urls.length > 0 && <div className="Insight">
              <h1 className="heading-2">Insight</h1>
              <div className="gif-container"></div>
              <div className="columns w-row" >
               <img src={urls[0]} className="hero-gif" />
                <table>
                  <tbody>
                    <tr>
                      {urls.length >= 2 &&<th><img src={urls[1]} className="hero-img"/></th>}
                      {urls.length >= 3 &&<th><img src={urls[2]} className="hero-img"/></th>}
                      {urls.length >= 4 &&<th><img src={urls[3]} className="hero-img"/></th>}
                    </tr>
                    </tbody>
                </table>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}

export default DestinationPanel;
