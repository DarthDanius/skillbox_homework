'use strict'

import $ from 'jquery';

$.ajax({
	'url': 'http://data.fixer.io/api/latest',
	'type': 'GET',
	'data': {
		'access_key': 'ec7be4b66d635a0fef74341d088e1bdb',
		// 'base': 'RUB',
	},
	'success': function(e){
		getMoney(e.rates, 'RUB', 'USD', 'EUR')
	},
});

function getMoney(e, base, ...money){
	let tmp=[];
	
	for (let i of money){
		let k = 1/e[i.toUpperCase()];
		tmp.push(`<p>${i.toUpperCase()} =  ${Math.round(e[base.toUpperCase()]*k*100)/100} ${base.toUpperCase()}</p>`)
	}
	
	$('.ajax').append(tmp.join(''));
};
