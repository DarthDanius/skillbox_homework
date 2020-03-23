"use strict"
document.addEventListener('DOMContentLoaded', function(){
	
	let el_field_code = document.querySelector('#code');
	let el_btn_code = document.querySelector('#code-exec');
	let el_field_func = document.querySelector('#function');
	let el_btn_func = document.querySelector('#function-exec');

	function codeExec(){
		// el_field_code.value = eval(el_field_code.value);
		let code = el_field_code.value;
		try {
			let result = eval(code);
			el_field_code.value = result;
		} catch(err) {
			let messageErr = `${err.name}:\n${err.message}`;
			el_field_code.value = messageErr;
		}
	}
	
	// function filterByType(...args){
	function filterByType(args){
		let type = null;
			if (!args[0]) {
				// console.log('тип аргумента не опознан');
				return 'тип аргумента не опознан';
			}
			
			if (args[0].toLowerCase() === 'boolean' || typeof args[0] === 'boolean') {
				type = 'boolean';
			} else if (args[0].toLowerCase() === 'number' || typeof args[0] === 'number') {
				type = 'number';
			} else if (args[0].toLowerCase() === 'string' || typeof args[0] === 'string') {
				type = 'string';
			} else {
				// console.log('тип аргумента не опознан');
				return 'тип аргумента не опознан';
			}

		return args.slice(1).filter(item => typeof item === type);
	}
	
	function funcExec(){
		try{
			let result = eval(`[${el_field_func.value}]`);
			result = filterByType(result);
			el_field_func.value = result;
		} catch(err) {
			let messageErr = `${err.name}:\n${err.message}`;
			el_field_func.value = messageErr;
		}
	}

	el_btn_code.addEventListener('click', codeExec);
	el_btn_func.addEventListener('click', funcExec);
});













