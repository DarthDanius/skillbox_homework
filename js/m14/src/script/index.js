'use strict'

// import "normalize.css"
const module = require('../modules/btn-counter')
import '../style/index.scss'

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-type=btn-counter]').forEach( (i) => {
    new module.Counter(i);
  })
})
