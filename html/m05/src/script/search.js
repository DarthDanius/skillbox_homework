'use strict'
// let el_perent = null;
let el_btn_search = null;


function createSearch(el_parent) {
  let el_form_search = document.createElement('form');
  el_form_search.className = 'search header-meta-mobile__search';
  el_form_search.setAttribute('name', 'search');
  
  let search_content = `
  <input type="search" class="search__input" placeholder="Поиск по сайту"  />
  <button type="button" class="search__btn" aria-label="search" value=" "></button>`
  
  el_form_search.innerHTML = search_content;
  el_form_search.style.display = 'none';
  el_form_search.addEventListener('mouseleave', ()=>{el_form_search.style.display = 'none'});
  el_form_search.querySelector('input').addEventListener('blur', ()=>{el_form_search.style.display = 'none'});
  el_parent.append(el_form_search);
  return el_form_search;
}

function searchOn (e) {
  let el_form_search =  (e.target.parentElement.querySelector('.header-meta-mobile__search')) || createSearch(e.target.parentElement);
  el_form_search.style.display = '';
  el_form_search.querySelector('input').focus();
}
function hendler(){
  // el_perent = document.querySelector('.header-meta-mobile-row-1');
  el_btn_search = document.querySelector('.btn-search');

  el_btn_search.addEventListener('click', searchOn);
}

document.addEventListener('DOMContentLoaded', hendler)