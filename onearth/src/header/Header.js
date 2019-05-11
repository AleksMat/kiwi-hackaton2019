import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './header.css';

@inject('uiStore')
@observer
class Header extends Component {

  render() {

    return (
      <div className="mainAppHeader">
        <img src="./onEarth-Logo@2x.png" className="logoImg"/>
      </div>
    );
  }
}

export default Header;
