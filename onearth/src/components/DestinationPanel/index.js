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
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Destination:</p>
                </td>
                <td>
                  <p>{name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Description:</p>
                </td>
                <td>
                  <p>{description}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Price:</p>
                </td>
                <td>
                  <p>{price}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default DestinationPanel;
