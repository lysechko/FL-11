class User {
  constructor(name, orderTotalPrice, weekendDiscount, nightDiscount, bonus) {
    this.name = name;
    this.orderTotalPrice = orderTotalPrice || 0;
    this.weekendDiscount = weekendDiscount || 0;
    this.nightDiscount = nightDiscount || 0;
    this.bonus = bonus || 0;
  }
  addItem(prize) {
    this.orderTotalPrice += prize;
  }

  makeOrder() {
    const price =
      this.orderTotalPrice -
      this.weekendDiscount -
      this.nightDiscount -
      this.bonus;
    return `Price after discount and including bonuses is ${price}`;
  }
}

const getDiscount = user => {
  const hours = new Date().getHours();
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;
  const isNightTime = hours < 6 || hours > 22;
  const weekendDiscount = 15;
  const nightDiscount = 4.5;
  if (isWeekend) {
    user.weekendDiscount = weekendDiscount;
  }
  if (isNightTime) {
    user.nightDiscount = nightDiscount;
  }
};

const setBonus = user => {
  const bonus = Math.floor(user.orderTotalPrice / 100) * 5;
  user.bonus = bonus;
};

const cart = new User();
cart.addItem(100);
cart.addItem(200);
console.log(cart.makeOrder());

setBonus(cart);
getDiscount(cart);

console.log(cart.makeOrder());
