function Animal(type){
  this.type = type;
}
Animal.isAnimal = function(obj){
  if(!Animal.prototype.isPrototypeOf(obj)){
    return false;
  } else return true
};

function Dog(name, breed){
  Animal.call(this, "dog");
  this.name = name;
  this.breed = breed;
}

Object.setPrototypeOf(Dog.prototype, Animal.prototype);
Dog.prototype.bark = function(){
  console.log("ruff, ruff");
};

Dog.prototype.print = function(){
  console.log("The dog " + this.name + " is a " + this.breed);
};

Dog.isDog = function(obj){
  return Animal.isAnimal(obj, "dog");
};

let x = new Dog('chaki', 'spaniel');