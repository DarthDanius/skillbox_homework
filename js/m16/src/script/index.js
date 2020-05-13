'use strict'

// require('../img-sprite-vector/' + name + '.svg');
// require.context('../', true, /(?<=img-sprite-vector\/)[^\/]+?.svg/)
import '../style/index.scss'
import {createStore} from 'redux';
import reducer from './redux/reducer.js'
import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import Widget from './components/Widget/Widget.jsx'

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <ErrorBoundary>
      <Widget/>
    </ErrorBoundary>,
    // <Widget/>,
    document.querySelector('.widget')
  )

})
console.log(createStore(reducer));


