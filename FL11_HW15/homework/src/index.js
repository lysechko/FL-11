function Hamburger(type, calories, secretIng) {
  'use strict';

  this.type = type;
  const cheeseCalories = 120;
  const tomattoCalories = 20;
  const secretIngradientCallories = 100;
  let _secretIng = secretIng || false;
  let _calories = calories;
  let bite = false;
  let cheese = 0;
  let tomatto = 0;
  let biteCounter = 0;

  if (_secretIng) {
    _calories += secretIngradientCallories;
  }

  this.getCalories = function() {
    return _calories;
  };

  this.setCalories = function(value) {
    _calories = value;
  };

  this.addCheese = function() {
    if (bite) {
      return 'Sorry you cannot add cheese.';
    }
    if (cheese < 1) {
      _calories += cheeseCalories;
      cheese++;
    } else {
      return 'Sorry, you can add cheese only once.';
    }
  };

  this.addTomatto = function() {
    if (bite) {
      return 'Sorry, you can add tomatto only twice.';
    }
    if (tomatto < 2) {
      _calories += tomattoCalories;
      tomatto++;
    } else {
      return 'Sorry you cannot add tomatto.';
    }
  };

  this.addSecretIngredient = function() {
    if (bite) {
      return 'Sorry you cannot add secret ingredient.';
    }
    if (_secretIng) {
      return 'Sorry, you can add secret ingredient only once.';
    }
    if (!_secretIng && !tomatto && !cheese) {
      _secretIng = true;
      _calories += secretIngradientCallories;
    } else {
      return 'Sorry, you can add secret ingredient only before another ingredients.';
    }
  };

  this.bite = function() {
    bite = true;
    biteCounter++;
  };

  this.info = function() {
    const hamburgerType =
      this.type.charAt(0).toUpperCase() + this.type.slice(1);
    return `${hamburgerType} hamburger:${
      _secretIng ? ' with secret ingredient,' : ' without secret ingredient,'
    }${cheese ? ' with cheese, ' : ' without cheese,'}${
      tomatto ? ' with ' + tomatto + ' tomatto,' : ' without tomatto,'
    }${
      bite ? ' is bit ' + biteCounter + ' times.' : ' not bite.'
    } Total calories: ${_calories}.`;
  };
}

const myHamburger = new Hamburger('classic', 600, false);

console.log(myHamburger.addSecretIngredient());
myHamburger.addCheese();
console.log(myHamburger.addTomatto());
console.log(myHamburger.addCheese());
console.log(myHamburger.addTomatto());
console.log(myHamburger.addSecretIngredient());
myHamburger.addTomatto();
myHamburger.bite();
myHamburger.bite();
myHamburger.bite();
console.log(myHamburger.info());
console.log(myHamburger.getCalories());
