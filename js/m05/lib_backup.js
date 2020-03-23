"use strict"

let lib = function(){
	
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
	
	let start = function (min=0, max=1000, countStart=10){// основная функция программы. загадывает число в указанном диапазоне.
		let count = countStart;
		let task = `отгадайте целое число от ${min} до ${max}. Число попыток: ` + count;
		let someNumber = Math.floor(Math.random() * (max-min+1) + min);
		console.log(someNumber);
		let answer = _check(prompt(task), task);
		let completed = true;

		while (answer !== someNumber){
			if (answer === null) return false;

			if (count-1 < 1){
				let restart = confirm(`вы лузер! Желаете повторить?`);
				
				if (restart){
					start(min, max, countStart);
					return false;
				} else {
					return false;
				}
			}

			if (answer < someNumber) {
				answer = _check(prompt(`больше! Осталось попыток: ${count - 1}.`), task)
			} else {
				answer = _check(prompt(`меньше! Осталось попыток: ${count - 1}.`), task)
			}

			count--;
			task = `отгадайте целое число от ${min} до ${max}. Число попыток: ` + count;
		}
		
		if (completed) alert(`правильно! вы отгадали с ${countStart - count +1} попытки.`);
	};
	
	return {
		start,	
	}
}()