"use strict"

let lib = function(){
	
	let min = null;
	let max = null;
	let countStart = null;
	let count = null;
	let someNumber = null;
	
	
	let _check = function (number, task='') {// вспомогательная функция проверки введенного пользователем значения.
		if (number === null){
			alert(`отмена`);
			return null;
		} 
		
		number = parseInt(number);
		
		if (isNaN(number)){
			let newTask = `вы ввели некорректное значение, повторите попытку\n` + task;
			return _check(prompt(newTask), task)
		} else {
			console.log(number);
			return number;
		}
	};
	
	let start = function (arg1=0, arg2=1000, arg3=10){// основная функция программы. загадывает число в указанном диапазоне.
		// переопределение глобальных переменных.
		[min, max, countStart] = [arg1, arg2, arg3];
		count = countStart;
		someNumber = Math.floor(Math.random() * (max-min+1) + min);
		console.log(someNumber);
		
		let task = `отгадайте целое число от ${min} до ${max}. Число попыток: ${count}`;
		let answer = _check(prompt(task), task);
		let completed = true;

		while (answer !== someNumber){
			if (answer === null) return false;

			if (count-1 < 1){
				let restart = confirm(`вы лузер! Желаете повторить?`);
				
				if (restart){
					return start(min, max, countStart);
				} else {
					return false;
				}
			}

			task = `отгадайте целое число от ${min} до ${max}. Число попыток: ${count-1}`;
			
			if (answer < someNumber) {
				answer = _check(prompt(`больше! Осталось попыток: ${count - 1}.`), task)
			} else {
				answer = _check(prompt(`меньше! Осталось попыток: ${count - 1}.`), task)
			}

			count--;
			console.log(count);
			console.log(task);
		}
		
		if (completed) alert(`правильно! вы отгадали с ${countStart - count +1} попытки.`);
	};
	
	return {
		start,	
	}
}()