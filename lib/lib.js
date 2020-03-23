'use strict'

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

function getRandom(min, max) {
  // случайное число от min до max
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(randss);
}

function getRandomError(){
  let rand = Math.floor(Math.random() * 101);
  console.log(`getRandomError: ${rand}`);
  if (rand > 51) throw new Error('случайная ошибка');
  return rand;
}

function testLoad(scr, callback){
  let result = null;
  let error = null;
  try {
    result = getRandomError()
    timer(2000, callback, error, result)
  } catch(err) {
    error = err;
    timer(2000, callback, error, result)
  }
}