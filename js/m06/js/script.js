"use strict"

/*
Написать простой прототип системы регистрации пользователей. Для этого используйте две функции-конструктора:

1. User, которая создает объект типа «пользователь» со следующими свойствами: { // имя firstName: ‘', // фамилия lastName: '’, // дата и время регистрации regDate: ''}. Объекты типа User предназначены для сохранения каждой отдельной записи о пользователе.

2. UserList, которая создает объект типа “список пользователей” со следующими свойствами и методами: { // внутреннее свойство-массив, в которое будут попадать объекты типа User users: [], // метод получает в качестве параметра объект типа User и сохраняет его в массив users add: function(user) {}, // метод возвращает список пользователей из массива users getAllUsers: function() {}}. Объекты типа UserList предназначены для хранения множества записей типа User. 

При запуске программы должно происходить:

1. Создавать новый экземпляр объекта UserList (с пустым свойством-массивом users).

2. Открываться диалог prompt с предложением ввести имя и фамилию пользователя для регистрации (одной строкой через пробел).

3. После нажатия ОК должен создаваться новый экземпляр объекта User с заполнением свойств firstName, lastName и regDate (текущая дата и время).

4. Созданный экземпляр объекта должен сохраняться в свойство-массив users созданного ранее объекта типа UserList (при помощи метода add).

5. Диалог prompt должен повторяться, пока пользователь не нажмет “Отмена”.

6. После нажатия «Отмена» выведите на экран (в консоль или при помощи alert) список всех пользователей с именами и датами регистрации (используйте для этого метод getAllUsers).

*/

let newUserList = null;

function User(firstName, lastName){
	
	function getDate(){// форматирует время в строку YYYY-MM-DD hh:mm:ss	
		function zeroFill(num, base=2){// если длинна строки меньше указанной - заполняет строку нолями слева до указанной длинны
			let tmp = num.toString();
			
			for ( let i = base - (base - tmp.length); i < base; i++ ){
				tmp = '0'+tmp;
			}
			
			return tmp;
		};
		
		let nowDate = new Date();		
		let year = zeroFill( nowDate.getFullYear(), 4 );
		let month = zeroFill( nowDate.getMonth()+1 );
		let day = zeroFill( nowDate.getDate() );
		let hours = zeroFill( nowDate.getHours() );
		let minutes = zeroFill( nowDate.getMinutes() );
		let seconds = zeroFill( nowDate.getSeconds() );
		
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};
	
	this.toString = function(){
		let str = `firstName : ${this.firstName},\nlastName : ${this.lastName},\nregDate : ${this.regDate}`;
		return str;
	}

	this.firstName = firstName;
	this.lastName = lastName;
	this.regDate = getDate();
}; 

function UserList(){

	this.data = [];
	
	this.add = function(...users){
		for (let i of users){
			if ( this.data.push(i) ) console.log(`объект успешно добавлен`);
		}
	};
	
	this.getAllUsers = function(){
		for (let i of this.data){
			console.log( i.toString() );
		};
		return this.data;
	};
};

function check(arg, task="") {
	if (arg === null){
		alert(`отмена`);
		return null;
	} 
	
	
	arg = arg.trim().split(" ");
	
	if ( arg.includes("") ){ 
		function filter(item){ if ( item !== "" ) return item };
		arg = arg.filter( filter );		
	};
	
	let newTask = "Вы ввели неверное значенте\n" + task;	
	if ( arg.length !==2 ) return check( prompt(newTask), task );	
	return arg;
};

function main(){
	newUserList = new UserList();		
	let task = "Введите имя и фамилию через пробел.\nПример: Иван Иванов";
	
	while (true){
		let names = check( prompt(task), task );
		if (names === null) break;
		newUserList.add( new User(...names) );
	};
	
	newUserList.getAllUsers();
	
}
