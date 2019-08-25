const maxElement = arr => {
  const array = arr.filter(item => typeof item === 'number' && isFinite(item));
  const max = Math.max(...array);
  return max;
};

console.log(maxElement([1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2]));

const copyArray = arr => {
  const result = [...arr];
  return result;
};
const array = [1, 2, 3];
const copiedArray = copyArray(array);
console.log(array, copiedArray);
console.log(array === copiedArray);

const addUniqueId = obj => {
  const objCopy = Object.assign({}, obj);
  objCopy['id'] = Symbol('id');
  return objCopy;
};

const obj = { name: 123 };
console.log(obj, addUniqueId(obj));

const regroupObject = obj => {
  const {
    name,
    details: { id, age, university }
  } = obj;
  const regroupObj = {
    university: university,
    user: {
      age: age,
      firstName: name,
      id: id
    }
  };
  return regroupObj;
};
const oldObj = {
  name: 'Someone',
  details: { id: 1, age: 11, university: 'UNI' }
};
console.log(regroupObject(oldObj));

const findUniqueElements = arr => {
  const uniqueElements = new Set(arr);
  const result = [...uniqueElements];
  return result;
};

const arr = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
console.log(findUniqueElements(arr));

const hideNumber = str => {
  const hideNum = str.slice(-4).padStart(str.length, '*');
  return hideNum;
};

const phoneNumber = '0123456789';
console.log(hideNumber(phoneNumber));

const required = () => {
  throw new Error('Missing property');
};
const add = (a = required(), b = required()) => {
  const sum = a + b;
  return sum;
};
console.log(add(1, 3));

const getNameUsingPromise = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const arr = data.map(item => item.name).sort();
      console.log(arr);
    })
    .catch(e => console.error(e));
};

getNameUsingPromise();

const getNameUsingAsync = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    const data = await response.json();
    const arr = data.map(item => item.name).sort();
    console.log(arr);
  } catch (e) {
    console.error(e);
  }
};

getNameUsingAsync();
