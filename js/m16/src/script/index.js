'use strict'

import '../style/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import Widget from './components/Widget/Widget.jsx';

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <ErrorBoundary>
      <Provider store = {store}>
        <Widget/>
      </Provider>
    </ErrorBoundary>,
    document.querySelector('.widget')
  )

})



