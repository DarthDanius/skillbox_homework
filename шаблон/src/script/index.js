'use strict'

// import "normalize.css"
import '../modules/slider'
import '../style/index.scss'

// отмена hover на tauch устройствах
if ( !('ontouchstart' in window || ( window.DocumentTouch && document instanceof DocumentTouch) ) ) {
  document.querySelectorAll('button').forEach( (i) => i.classList.add('no-touch') )
}

// выпадающее меню
// document.querySelector('.header-main__btn-nav').addEventListener('click', () => {
//   document.querySelector('.nav-main').classList.toggle('nav-main_mobile')
// })
