"use strict"

let user = {
	firstName: "Вася",
	sayHi() {
		alert(`Привет, ${this.firstName}!`);
	}
};

// let timer = function(t){setTimeout(user.sayHi, t*1000);};
let f1 = user.sayHi;
let f2 = user.sayHi();
let f3 = function(){user.sayHi()};

function test(){
	f1();
	f2,
	f3();
};

//sum(1)(2) = 3

function sum(a){
	return function(b){
		return a+b;
	}
}

function zeroFill(num, base=2){
	let tmp = num.toString();
	
	for ( let i = base - (base - tmp.length); i < base; i++ ){
		tmp = '0'+tmp;
	}
	
	return tmp;
};

function check(arg){
	arg = arg.trim().split(" ");
	console.log(arg);
	if ( arg.includes("") ) {
		arg = arg.filter( (item)=>{
			if ( item !== "" ) {
				console.log(item);
				return item;
			}
		} );
	};
	return arg;
};

str = "  Вася    Пупкин ";
check(str);
