'use strict'

// perent .header-meta-mobile-row-1
let el_perent = null;
let el_nav = null;
let el_btn_nav = null;


function getPositionY(el){
  let positionY = el.offsetTop + el.offsetHeight;
  return positionY;
}

function setPositionY(el, el_target) {
  let positionY = getPositionY(el_target);
  if (el.offsetHeight == 0 || el.offsetTop == positionY) {
    return;
  }
  el.style.top = positionY + 'px';
}

function navOn(e){
  e.target.classList.add('btn-nav_close');
  el_nav.style.display = "block"
  setPositionY(el_nav, el_perent);
}

function navOff(e){
  e.target.classList.remove('btn-nav_close');
  el_nav.style.display = ""
}

function navToggle(e){
  if (e.target.classList.contains('btn-nav_close')) {
    navOff(e);
  } else {
    navOn(e);
  }
}

function hendler(){
  el_perent = document.querySelector('.header-meta-mobile-row-1');
  el_nav = document.querySelector('.header-nav');
  el_btn_nav = document.querySelector('.btn-nav');

  window.addEventListener('resize', ()=>setPositionY(el_nav, el_perent) );
  el_btn_nav.addEventListener('click', navToggle);
}

document.addEventListener('DOMContentLoaded', hendler)