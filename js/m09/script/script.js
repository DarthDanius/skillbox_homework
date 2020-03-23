'use sctrict'

let el_field_name = null;
let el_btn_addItem = null;
let el_list = null;
let el_list_empty = null;

let itemHeaders = new Set();

function checkForm() {
	let err = document.querySelector(`[data-id=${this.id}]`);
	if (err) err.remove();
	let errMessage = ''
	if (this.value.trim() == '') {// проверка полей на пустое значение
		errMessage = 'Пустое значение.'
		if (this.validationMessage === errMessage) {
			return false;
		}
		this.setCustomValidity(errMessage);
		createErr(this, this.validationMessage);
		this.value = '';
		return false;
	};
	if (this.id == 'item-create-name' && itemHeaders.has(this.value)) {// проверка загаловка списка на существование
		errMessage = 'Заметка с таким именем уже есть.'
		if (this.validationMessage === errMessage) {
			return false;
		}
		this.setCustomValidity(errMessage);
		createErr(this, this.validationMessage);
		return false;
	};
	this.setCustomValidity('');
	return true;
}

function createErr(el, message) {
	let err = document.createElement('span');
	err.className = 'err';
	err.dataset.id = el.id;
	err.innerHTML = message;
	function getPosition(el, err){
		err.style.width = el.offsetWidth+'px';
		err.style.top = el.offsetTop+el.offsetHeight+'px';
		err.style.left = el.offsetLeft+'px';		
	}
	getPosition(el, err);
	window.addEventListener('resize', ()=>getPosition(el, err) );
	el.after(err);
}

function itemDelete(e) {
	let el = e.target;
	itemHeaders.delete( el.closest('.item').querySelector('p').innerText );
	el.closest('.item').remove();
	if (itemHeaders.size === 0) {
		el_list_empty.classList.remove('hidden');
	}
};

function through(e) {
	let el = e.target;
	el.classList.toggle('through');
}

let hendler = function() {
	el_field_name = document.getElementById('item-create-name');
	el_btn_addItem = document.getElementById('add-item');
	el_list = document.getElementById('list-1');
	el_list_empty = document.querySelector('.list-empty');
	
	(function initial(){
		for (let x of document.querySelectorAll('.item-delete')){
			x.addEventListener('click', itemDelete);
		}
		
		for (let x of document.querySelectorAll('.item p')){
			x.addEventListener('click', through);
		}
	})();

	function addItem() {
		if ( !checkForm.bind(el_field_name)() ) {
			return false;
		}

		let item_content =
		`
			<input type="button" value="" class="item-delete">
			<p>${el_field_name.value}</p>
		`;
		let el_item = document.createElement('li');
		el_item.className = 'item';
		el_item.innerHTML = item_content;
		el_item.querySelector('p').addEventListener('click', through);
		el_item.querySelector('.item-delete').addEventListener('click', itemDelete);
		el_list.append(el_item);
		itemHeaders.add(el_field_name.value);
		
		if ( !el_list_empty.classList.contains('hidden') ) {// прячем "список пуст"
			el_list_empty.classList.add('hidden');
		}
		
		el_field_name.value = '';// очишаем поля
	}

	el_btn_addItem.addEventListener('click', addItem);

};

document.addEventListener('DOMContentLoaded', hendler);