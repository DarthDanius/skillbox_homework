'use sctrict'

let editToggle = false;//кнопка "редактировать" активна
let changed = false;//контент был изменен
let prefix = '82k3';//префикс ключей localStorage

let btn_edit = null;
let btn_save = null;
let btn_cancel = null;
let btn_scroll = null;
let el_slide = null;
let el_editer = null;
let defaultText = null;

function getDate(date){// форматирует время в строку YYYY-MM-DD hh:mm:ss	
  function zeroFill(num, base=2){// если длинна строки меньше указанной - заполняет строку нолями слева до указанной длинны
    let tmp = num.toString();
    
    for ( let i = base - (base - tmp.length); i < base; i++ ){
      tmp = '0'+tmp;
    }
    
    return tmp;
  };
  let nowDate = (!date || !date instanceof Date) ? new Date() : date;
  let year = zeroFill( nowDate.getFullYear(), 4 );
  let month = zeroFill( nowDate.getMonth()+1 );
  let day = zeroFill( nowDate.getDate() );
  let hours = zeroFill( nowDate.getHours() );
  let minutes = zeroFill( nowDate.getMinutes() );
  let seconds = zeroFill( nowDate.getSeconds() );
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function edit(e){
  if ( !e.currentTarget.classList.contains('btn-active') ) {
    e.currentTarget.classList.add('btn-active');
    el_editer.setAttribute('contenteditable', 'true');
    el_slide.classList.toggle('disabled');
    btn_scroll.classList.toggle('disabled');
    editToggle = true;
    if (changed) {
      btn_save.removeAttribute('disabled');
      btn_cancel.removeAttribute('disabled');
    }
  } else {
    e.currentTarget.classList.remove('btn-active');
    el_editer.setAttribute('contenteditable', 'false');
    el_slide.classList.toggle('disabled');
    btn_scroll.classList.toggle('disabled');
    btn_save.setAttribute('disabled', 'disabled');
    btn_cancel.setAttribute('disabled', 'disabled');
    editToggle = false;
  }
}

function removeSlideItem(e){
  e.stopPropagation();
  let item = e.currentTarget.closest('.slide-item');
  let key = prefix+item.querySelector('p').innerText;
  localStorage.removeItem(key);
  e.currentTarget.closest('.slide-item').remove();
  if (el_slide.querySelectorAll('.slide-item').length < 2) {
    scrollOff(e);
  }
}

function editChange(){//срабатывает при изменении контента
  changed = true;
  if ( btn_save.hasAttribute('disabled') ) {
    btn_save.removeAttribute('disabled');
    btn_cancel.removeAttribute('disabled');
  }
}

function createSlideItem(args, flags){//берет ключи localStorage и на их основе создает элементы <li>. 
//принимает объект с флагами в виде необязательного аргумента {current: true, default: false}
  let flag_default = false;	
  let flag_current = true;

  // console.log(flags);

  if (flags) {
    if (flags.hasOwnProperty('default')) flag_default = flags.default;
    if (flags.hasOwnProperty('current')) flag_current = flags.current;
  }

  function sortDate(a, b){//функция сортировки по Date
    if (a.dateDate < b.dateDate) return -1;
    if (a.dateDate == b.dateDate) return 0;
    if (a.dateDate > b.dateDate) return 1;
  }
  
  function createElem(content){//функция создания элемента
    let item_content = null;
    
    if (content) {
      item_content =
      `<p>${content}</p>
      <button type="button" class="btn-remove" value=" "></button>`;
    } else {
      item_content = `<p>default text</p>`;
    }

    let el_item = document.createElement('li');
    el_item.className = 'slide-item';
    el_item.innerHTML = item_content;
    el_item.addEventListener('click', load);
    if (content) {
      el_item.querySelector('.btn-remove').addEventListener('click', removeSlideItem);
    } else {
      el_item.classList.add('slide-item-default');
    }
    return el_item;
  }

  let tmp = [];	
  
  for (let i of args){//преобразуем ключи с префиксом
    if (i.startsWith(prefix)) i = i.slice(prefix.length, );
    tmp.push({
      dateString: i,
      dateDate: new Date(Date.parse(i))
    });
  }	
  if (tmp.length !== 0) tmp.sort(sortDate);//сортируем по дате
  
  if (flag_default && !el_editer.querySelector('slide-item-default')) {//создаем item с дефолтным текстом
    let el_item = createElem();
    if (tmp.length === 0) el_item.classList.add('slide-item-current');
    el_slide.prepend(el_item);
  }
  
  for (let j of tmp){
    let el_item = createElem(j.dateString);
    if (flag_current === true && j === tmp[tmp.length-1]) {//если последний по Date - назначить текущим
      let el_current = el_slide.querySelector('.slide-item-current');
      if (el_current) el_current.classList.remove('slide-item-current');
      el_item.classList.add('slide-item-current');
    }
    el_editer.innerHTML = localStorage.getItem(prefix+j.dateString);
    el_slide.prepend(el_item);
  }
  if (el_slide.querySelectorAll('.slide-item').length > 1 && btn_scroll.classList.contains('hidden')) {// если больше одного - включить стрелочку
    btn_scroll.classList.remove('hidden');
  }
}

function save(e, flags){//добавление в localStorage и вызов функции создания элемента
  let name = prefix+getDate();
  localStorage.setItem( name , el_editer.innerHTML );
  
  changed = false;
  btn_save.setAttribute('disabled', 'disabled');
  btn_cancel.setAttribute('disabled', 'disabled');
  
  createSlideItem([name], flags);
}

function getVersion(){//получение ключей из localStorage
  let storageKeys = [];
  for (let key in localStorage) {
    if ( !(localStorage.hasOwnProperty(key) && key.startsWith(prefix)) ) continue;
    storageKeys.push(key);
  }
  return storageKeys;
}

function load(e){
  let el_current = el_slide.querySelector('.slide-item-current');
  if (el_current !== e.currentTarget) {
    el_current.classList.remove('slide-item-current');
    e.currentTarget.classList.add('slide-item-current');
    if (changed) {
      if (confirm('Желаете сохранить изменения?')) save(e, {current: false});
    }
    if (e.currentTarget.classList.contains('slide-item-default') ) {
      el_editer.innerHTML = defaultText;
      scrollOff(e);
    }
    else {
      let key = prefix+e.currentTarget.closest('.slide-item').querySelector('p').innerText;
      el_editer.innerHTML = localStorage.getItem(key);
      scrollOff(e);
    }
  }
}

function cancel(e){
  let item_current = el_slide.querySelector('.slide-item-current');
  if (item_current.classList.contains('slide-item-default')) {
    el_editer.innerHTML = defaultText;
  } else {
    let key = prefix+item_current.querySelector('p').innerText;
    el_editer.innerHTML = localStorage.getItem(key);
  }	
  changed = false;
  btn_save.setAttribute('disabled', 'disabled');
  btn_cancel.setAttribute('disabled', 'disabled');
}

function scrollOn(e){
  if (editToggle) {
    el_slide.classList.remove('slide-hide-child');
    btn_scroll.classList.add('hidden');
    el_slide.querySelector('.slide-item-current').classList.add('selected');
  }
}

function scrollOff(e){
  if ( !e.currentTarget.classList.contains('slide-hide-child') ) {
    el_slide.classList.add('slide-hide-child');
    if (el_slide.querySelectorAll('.slide-item').length > 1) btn_scroll.classList.remove('hidden');
    let item_selected = el_slide.querySelector('.selected');
    if (item_selected) item_selected.classList.remove('selected');
  }
}

function initial(){
  btn_edit = document.querySelector('#edit');
  btn_save = document.querySelector('#save');
  btn_cancel = document.querySelector('#cancel');
  btn_scroll = document.querySelector('#btn-scroll');
  el_slide = document.querySelector('#slide');
  el_editer = document.querySelector('#editor');
  defaultText = el_editer.innerHTML;

  createSlideItem(getVersion(), {default: true});
  
  btn_edit.addEventListener('click', edit);
  btn_save.addEventListener('click', save);
  btn_cancel.addEventListener('click', cancel);
  btn_scroll.addEventListener('click', scrollOn);
  el_slide.addEventListener('mouseleave', scrollOff);
  el_editer.addEventListener('input', editChange);
}

document.addEventListener('DOMContentLoaded', initial);