'use strict'

let $el_list_empty = null;
let item_count = null;

let itemHeaders = new Set();

function checkForm(el_field) {
	let err = $(`[data-id=${el_field.id}]`);
	if (err) err.remove();
	let errMessage = ''
	if (el_field.value.trim() == '') {// проверка полей на постое значение
		errMessage = 'Пустое значение.'
		if (el_field.validationMessage === errMessage) {
			return false;
		}
		el_field.setCustomValidity(errMessage);
		createErr(el_field, el_field.validationMessage);
		el_field.value = '';
		return false;
	};
	if (el_field.id == 'item-create-name' && itemHeaders.has(el_field.value)) {// проверка загаловка списка на существование
		errMessage = 'Заметка с таким именем уже есть.'
		if (el_field.validationMessage === errMessage) {
			return false;
		}
		el_field.setCustomValidity(errMessage);
		createErr(el_field, el_field.validationMessage);
		return false;
	};
	el_field.setCustomValidity('');
	return true;
}

function createErr(el, message) {
	let $err = $('<span>').addClass('err').attr('data-id', el.id).html(message);
	$(el).after($err)

}

function removeItem(elem){
	elem = elem.target;
	itemHeaders.delete( $(elem).closest('.item').find('h2').text() );
	elem.closest('.item').remove();
	if (itemHeaders.size === 0){
		$el_list_empty.show();
	}
}

function scrollItem(elem){
	elem = elem.target;
	$(elem).closest('.item').find('.item-scroll').toggleClass('scrollOff');
	$(elem).closest('.item').find('.scroll').slideToggle('fast');
}

$('redy', function(){
	
	$el_list_empty = $('#list-empty');
	let $el_field_name = $('#item-create-name');
	let $el_field_description = $('#item-create-description');
	let $el_btn_add = $('#add-item');
	let $el_list = $('#list1');

	function addItem(){
		
		if (
		!checkForm($el_field_name[0]) ||
		!checkForm($el_field_description[0])
		) {
			return false;
		}
		
		let $el_item_content = $(
		`<li class="item">
			<article>
				<header class="item-header">
					<h2>${$el_field_name.get(0).value}</h2>
					<button type="button" value=" " class="item-delete"></button>					
					<button type="button" value=" " class="item-scroll"></button>
				</header>
				<div class="scroll">
					<p class="item-body">${$el_field_description.get(0).value}</p>
				</div>
			</article>
		</li>`);
		$el_item_content.find('.item-delete').bind('click', removeItem);
		$el_item_content.find('.item-scroll').bind('click', scrollItem);
		$el_list.prepend($el_item_content);

		itemHeaders.add( $el_field_name.val() );//добавление заголовка в множество 
		
		$el_field_name.val('');//очищаем поля
		$el_field_description.val('');
		
		if ( !$el_list_empty.is(':hidden') ){//прячем "список пуст"
			$el_list_empty.hide();
		}
	}
	
	$el_btn_add.bind('click', addItem);
});