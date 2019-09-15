function reverseNumber(number) {
  let sign = 1;
  let digit = 0;
  let reverse = "";
  if (number < 0) {
    sign = -1;
    number = number * sign;
  }
  while (number > 0) {
    digit = number % 10;
    reverse += digit;
    number = parseInt(number / 10);
  }
  return parseInt(reverse) * sign;
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);
