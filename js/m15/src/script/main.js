'use strict'

// import {renderWidget} from './render'
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget/Widget.jsx'

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Widget/>,
    document.querySelector('.widget')
  )

})
