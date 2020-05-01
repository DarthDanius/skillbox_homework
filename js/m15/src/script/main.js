'use strict'

// import {renderWidget} from './render'
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
