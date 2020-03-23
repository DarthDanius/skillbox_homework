"use strict"

function Transport(type){
	this.type = type;
	this.discription = "может двигаться, может не двигаться. Перевозит как минимум одного человека и кое что из груза";// у меня проблема с придумыванием свойств...
}

Transport.isTransport = function(obj, type){
	if ( !Transport.prototype.isPrototypeOf(obj) ){
		return false;
	} else return true;
};
Transport.prototype.moveStart = function(){ console.log("начать движение") };
Transport.prototype.moveStop = function(){ console.log("остановиться") };

function Car(model){
	Transport.call(this, "car");
	this.movementType = "riding";
	this.model = model;
}
Object.setPrototypeOf(Car.prototype, Transport.prototype);
Car.prototype.moveStart = function(){
	console.log('завсести мотор');
	Transport.prototype.moveStart();
}
Car.prototype.moveStop = function(){
	Transport.prototype.moveStop();
	console.log('выключить мотор');
}

function Airplane(model){
	Transport.call(this, "airplane");
	this.movementType = "flight";
	this.model = model;
}
Object.setPrototypeOf(Airplane.prototype, Transport.prototype);
Airplane.prototype.moveStart = function(){
	console.log('завсести мотор');
	Transport.prototype.moveStart();
	console.log('поднять шасси');
}
Airplane.prototype.moveStop = function(){
	console.log('опустить шасси');
	Transport.prototype.moveStop();
	console.log('выключить мотор');
}

function Ship(model){
	Transport.call(this, "ship");
	this.movementType = "swimming";
	this.model = model;
}
Object.setPrototypeOf(Ship.prototype, Transport.prototype);
Ship.prototype.moveStart = function(){
	console.log('поднять якорь');
	console.log('завсести мотор');
	Transport.prototype.moveStart();
}
Ship.prototype.moveStop = function(){
	console.log('айсберг!');
}

let bmw = new Car("bmw");
let boeing = new Airplane("boeing 747");
let titanic = new Ship("olympic");

// console.log(bmw, boeing, titanic);
