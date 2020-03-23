'use strict'

// perent .header-meta-mobile-row-1
let el_perent = null;
let el_nav = null;
let el_btn_nav = null;




function hendler(){
  el_perent = document.querySelector('.banner-list');
  el_nav = document.querySelector('.header-nav');
  el_btn_nav = document.querySelector('.btn-nav');

  window.addEventListener('resize', ()=>setPositionY(el_nav, el_perent) );
  el_btn_nav.addEventListener('click', navToggle);
}

document.addEventListener('DOMContentLoaded', hendler)