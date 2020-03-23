function task01(){
	let number1 = check(prompt(`введите первое число:`));
	let number2 = check(prompt(`введите второе число:`));

	if (number1 < number2){
		alert(`${number1} меньше чем ${number2}`);
	} else if (number1 > number2) {
		alert(`${number1} больше чем ${number2}`);
	} else {
		alert(`${number1} и ${number2} равны`);
	}
}

function task02(){

	/*
	1)Если год равномерно делится на 4, перейдите на шаг 2.
	2)Если год равномерно делится на 100, перейдите на шаг 3.
	3)Если год равномерно делится на 400, перейдите на шаг 4.
	4)Год високосный (он имеет 366 дней).
	5)Год не високосный год (он имеет 365 дней).
	1900-2006
	*/
	
	let firstYear = check(prompt(`введите начальный год:`, "1900"));
	let secondYear = check(prompt(`введите конечный год:`, "2019"));

	if (firstYear >= secondYear){
		alert("конечный год должен быть больше начального года");
	} else {
		let leapYears = [];
		while (firstYear <= secondYear) {
		if (!(firstYear % 4)) {
			if (firstYear % 100 || (!(firstYear % 100) && !(firstYear % 400))) {
				leapYears.push(firstYear);
			}
		}
		firstYear++;
	}
	alert(leapYears.join("\n"));
	console.log(leapYears.join("\n"));
	}
}

function task03(){
	let sum = 0;
	let number = prompt(`введите число`);

	while (number !== null) {
		if (!isNaN(number)){
			sum = sum + parseInt(number);
			console.log(`введено число ${number}`);
			console.log(`сумма равна ${sum}`);
		}
		number = prompt(`введите следующее число`);
	}

	alert(sum);
}

function check(number){
	number = parseInt(number);
	if (isNaN(number) || number === null){
		alert(`вы ввели некорректное значение\n повторите попытку`);
		return check(prompt(`повторите ввод ЧИСЛА:`))
	} else {
		return number;
	}
}