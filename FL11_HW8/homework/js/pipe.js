function pipe(val) {
  if (arguments.length > 1) {
    let value = arguments[1].call(this, val);
    for (let i = 2; i < arguments.length; i++) {
      value = arguments[i].call(this, value);
    }
    return value;
  }
  return val;
}

function addOne(x) {
  return x + 1;
}

pipe(
  1,
  addOne
);
pipe(
  1,
  addOne,
  addOne
);
