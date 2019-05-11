import React, { Component } from 'react';
import {Provider} from 'mobx-react'

import Header from './header/Header'
import Map from './components/Map'
import DestinationPanel from './components/DestinationPanel'

import './App.css';

class App extends Component {

  render() {
    return (
      <Provider {...this.props.stores}>
        <div className="App">
          <div className="rootVerticalApp">
                <Header/>
                <div className="horizontalWrap">
                  <Map/>
                  <DestinationPanel />
                </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;