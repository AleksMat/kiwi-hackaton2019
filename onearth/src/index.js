import React from 'react';
import ReactDOM from 'react-dom';
import { toJS } from 'mobx';

import App from './App';
import UiStore from './store/UiStore';

// Store
const uiStore = new UiStore();

window.toJS = toJS;
window.uiStore = toJS(uiStore);

ReactDOM.render(<App stores={{ uiStore }} />, document.getElementById('root'));
