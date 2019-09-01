const create = obj => {
  if (typeof obj !== 'object') {
    throw new Error('Input argument does not have an object type ');
  }
  function F() {
    return;
  }
  F.prototype = obj;
  return new F();
};

const obj1 = { prop: 5 };
const obj2 = create(obj1);

console.log(Object.getPrototypeOf(obj2) === obj1);
console.log(obj2.prop);
