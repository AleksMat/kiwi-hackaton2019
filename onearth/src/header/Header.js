import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './header.css';

@inject('uiStore')
@observer
class Header extends Component {

  render() {

    return (
      <div className="mainAppHeader">
        <h3 style={{ paddingLeft: '20px' }}>onEarth</h3>
      </div>
    );
  }
}

export default Header;
