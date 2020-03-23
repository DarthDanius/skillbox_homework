"use strict"

/*
1. Написать программу, которая выводит текущую дату в полном русскоязычном формате, например: “Сегодня 8 декабря 2018 года, суббота, 20 часов 6 минут 54 секунды”. Следует обратить внимание на правильные склонения слов “час”, “минута”, “секунда”. 
Продвинутый уровень: с помощью стандартной функции setInterval сделать так, чтобы сформированная строка с датой и временем отображалась в консоли каждую секунду.


*/

let Calendar = {
	DAYS : ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
	MONTHS : ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
	nowDate : new Date(),

	getDate() {
		let nowDate = new Date()

		let year = nowDate.getFullYear();
		let month = this.MONTHS[nowDate.getMonth()];
		let day = nowDate.getDate();
		let dayOfWeek = this.DAYS[nowDate.getDay()];
		let hours = nowDate.getHours().toString();
		let minutes = nowDate.getMinutes().toString();
		let seconds = nowDate.getSeconds().toString();

		let hoursEnding;
		if( +(hours[hours.length-2]) === 1 ){
			hoursEnding = "ов";
		}	else{
			hoursEnding = (hours === 1) ? "" : (hours > 1 && hours <5) ? "а" : "ов";
		};

		let minutesEnding;
		if( +(minutes[minutes.length-2]) === 1 ){
			minutesEnding = "";
		}	else{
			minutesEnding = (+(minutes[minutes.length-1]) === 1) ? "а" : (+(minutes[minutes.length-1]) > 1 && (+(minutes[minutes.length-1]) <5)) ? "ы" : "";
		};

		let secondsEnding;
		if( +(seconds[seconds.length-2]) === 1 ){
			secondsEnding = "";
		}	else{
			secondsEnding = (+(seconds[seconds.length-1]) === 1) ? "а" : (+(seconds[seconds.length-1]) > 1 && (+(seconds[seconds.length-1]) <5)) ? "ы" : "";
		}

		return `Сегодня ${day} ${month} ${year} года, ${dayOfWeek}, ${hours} час${hoursEnding} ${minutes} минут${minutesEnding} ${seconds} секунд${secondsEnding}`;
	},
	
	showDate() { console.log(this.getDate()) },
	
	startTimer(t) {
		setInterval( ()=>this.showDate(), t*1000 ) 
		console.log("таймер запущен");
	},	

}

let users = [];

function check(x, message){
	if (x === null) {console.log(message); alert(message); return false};
	return x;
};

function getParam(flag = false, message = "отмена"){// если флаг = true => запросить имя; message - сообщение при отмене ввода

	let log = check(prompt("введите логин"), message);
	if (!log) return false;
	let pass = check(prompt("введите пароль"), message);
	if (!pass) return false;
	let name = null;
	
	let obj = {
		'log' : log,
		'pass' : pass
	}
	
	if (flag){
		name = check(prompt("введите имя"), message);
		if (!name) return false;
		obj.name = name;
	}
		
	return obj;
};

function checkUser(obj){
	// console.log(obj);		
	
	for ( let i of users ){
		// console.log(i);		
		let tmp = [];
		
		for ( let j in obj ){
			// console.log(j);
			( obj[j] === i[j] ) ?  tmp.push(true) : tmp.push(false);
		};
		
		// console.log(tmp);
		if ( tmp.every( (x)=>x===true )) {console.log('пользователь найден'); return [true, i.name]};
	};
	
	console.log('я вас не знаю');
	return [false];
}

function authorization(){
	let param = getParam(false, "отмена авторизации");//
	if (!param) return false;
	
	let check = checkUser(param);

	if ( check[0] ){
		alert(`Добро пожаловать, ${check[1]}`);
		return;
	}

	if( !confirm( "Вы не зарегестрированы. Зарегестрироваться?" ) ) {console.log("отмена"); return false};
	registration();	
}

function registration(){
	let param = getParam(true, "отмена регистрации");
	if (!param) return false;
	
	if (checkUser( {'log' : param.log} )[0]) {
		alert("Пользователь с таким логином уже существует, выберите другой.");
		registration();
		return;
	}
		
	users.push(param);
	alert("вы успешно зарегестрированы! Войдите используя свой логин и пароль");
	
	authorization();
}



















