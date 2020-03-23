"use strict"

function init(numb1, numb2){
	
	let [min, max] = function(){
		numb1 = parseInt(numb1);
		numb2 = parseInt(numb2);
		if ((numb1 !==0 && !numb1) || (numb2 !==0 && !numb2) || numb1 === numb2){
			numb1 = 1;
			numb2 = 10;
			console.log(`введено некорректное число. Установлен диапазон от ${numb1} до ${numb2}`);
		} else if (numb1 > numb2) {	
			[numb1, numb2] = [numb2, numb1];
		}
		console.log(`min = ${numb1}, max = ${numb2}`);
		return [numb1, numb2];
	}();
	
	let task = `отгадайте целое число от ${min} до ${max}`;
	
	function task01(){			
		let someNumber = Math.floor(Math.random() * (max-min+1) + min);
		console.log(someNumber);
		let answer = check(prompt(task));
		let count = 1;
		let completed = true;
		
		while (answer !== someNumber){
			if (answer === null){
				completed = false;
				break;
			}
			else if (answer < someNumber) {
				answer = check(prompt(`больше!`))
			} else {
				answer = check(prompt(`меньше!`))
			}
			count++;
		}
		
		if (completed) alert(`правильно! вы отгадали с ${count} попытки.`);
	}

	function check(number) {
		if (number === null){
			alert(`отмена`);
			return null;
		} 
		
		number = parseInt(number);
		
		if (isNaN(number)){
			alert(`вы ввели некорректное значение\n повторите попытку`);
			return check(prompt(task))
		} else {
			console.log(number);
			return number;
		}
	}

	task01();
}