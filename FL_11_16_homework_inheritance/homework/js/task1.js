const assign = (target, ...source) => {
  for (let obj of source) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      target[keys[i]] = obj[keys[i]];
    }
  }
  return target;
};

const defaults = { a: 123, b: 777 };
const options = { a: 456 };
const configs = assign({}, defaults, options); // => {a: 456, b: 777}
console.log(configs);
