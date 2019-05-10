import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import s from 'styled-components';
import { debounce } from 'lodash';

import './destination.css';

class DestinationPanel extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div className="destinationWrap">
         
      </div> 
    );
  }
}

export default DestinationPanel;
