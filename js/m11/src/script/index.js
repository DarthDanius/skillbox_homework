"use strict"

const key = 'trnsl.1.1.20160630T201716Z.0162e4f4b40b4f27.bed1b117a24173e4d995e7d43f67739ea367b060';
let langList = null; //список языков загружается асинхронно.
const default_lang_in = 'ru';
const default_lang_out = 'en';

let el_btn_lang_in;
let el_btn_lang_out;
let el_value_lang_in;
let el_value_lang_out;
let el_btn_submit;
let el_field_lang_in;
let el_field_lang_out;
let el_list_lang;

let el_calling_btn = null;//вызывающая кнопка, одна из двух

function createLangList(el_list, arr){
  let item = null;

  for (let i of arr) {
    item = document.createElement('li');
    item.innerHTML = `<p>${i[1]}</p>`;
    item.dataset.lang = i[0];
    item.addEventListener('click', setLang);
    el_list.append(item)
  }
}

async function getLangList(){
  let url = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=ru&key=${key}`;

  return fetch(url)
  .then( result => result.json() )
  .then( result => Object.entries(result.langs).sort( function(a, b) {
    if (a[1] > b[1]) { 
      return 1; } 
    if (a[1] < b[1]) { 
      return -1; } 
    return 0; 
  }) )
  .then( result => {langList = result; return result})
  .catch( err => console.error(err) )
}

function setLang(e) {
  el_calling_btn.dataset.lang = e.currentTarget.dataset.lang;
  el_calling_btn.parentNode.querySelector('p').innerHTML = e.currentTarget.querySelector('p').innerText;
  el_list_lang.style.display = "none";
  document.querySelector('.selected').classList.remove('selected');
}

function showLangList(e) {
  el_calling_btn = e.target;
  let selected = document.querySelector(`li[data-lang=${e.target.dataset.lang}]`)
  selected.classList.add('selected');
  el_list_lang.style.display = "";
}

async function translate(){
  if (!el_field_lang_in.value) {
    alert('пустое поле');
    return;
  }
  if (el_btn_lang_in.dataset.lang === el_btn_lang_out.dataset.lang) {
    alert('язык перевода должен отличаться от оригинала');
    return;
  }
//   https://translate.yandex.net/api/v1.5/tr.json/translate
//  ? [key=<API-ключ>]
//  & [text=<переводимый текст>]
//  & [lang=<направление перевода>]
//  & [format=<формат текста> <plain-по умолчанию, html>]
//  & [options=<опции перевода>]
//  & [callback=<имя callback-функции>]

  let url = new URL('https://translate.yandex.net/api/v1.5/tr.json/translate');
  url.searchParams.append('key', key);
  url.searchParams.append('text', el_field_lang_in.value);
  url.searchParams.append('lang', `${el_btn_lang_in.dataset.lang}-${el_btn_lang_out.dataset.lang}`);
  url.searchParams.append('format', `html`);

  fetch(url, {method: 'POST'})
  .then( r => r.json() )
  .then( r => {
    // console.log(r);
    el_field_lang_out.value = r.text;
  }).catch( err => console.error(err) )
}

function init(){
  el_list_lang = document.querySelector('.list-lang');
  el_btn_lang_in = document.querySelector('.btn-lang-in');
  el_btn_lang_out = document.querySelector('.btn-lang-out');
  el_value_lang_in = document.querySelector('.wrap-lang-in p');
  el_value_lang_out = document.querySelector('.wrap-lang-out p');
  el_btn_submit = document.querySelector('.btn-submit');
  el_field_lang_in = document.querySelector('.field-lang-in');
  el_field_lang_out = document.querySelector('.field-lang-out');

  getLangList()//загружаем список языков
  .then( function(result) {createLangList(el_list_lang, result); return result})//создаем по нему список элементов
  .then( (result) => {//инициализация языков по умолчанию
    el_btn_lang_in.dataset.lang = default_lang_in;
    let tmp = result.find( (i) => i[0] == default_lang_in)[1];
    el_btn_lang_in.parentNode.querySelector('p').innerHTML = tmp;
    el_btn_lang_out.dataset.lang = default_lang_out;
    tmp = result.find( (i) => i[0] == default_lang_out)[1];
    el_btn_lang_out.parentNode.querySelector('p').innerHTML = tmp;
  })
  .catch( err => console.error(err) )

  document.querySelectorAll('.btn-select').forEach( item => item.addEventListener('click', showLangList) );
  el_btn_submit.addEventListener('click', translate);
}

document.addEventListener('DOMContentLoaded', init)