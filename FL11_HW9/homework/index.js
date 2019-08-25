function getNumbers(str) {
  str = str.replace(/\s+/g, '');
  const array = [];
  for (let item of str) {
    let num = parseInt(item);
    if (typeof num === 'number' && isFinite(num)) {
      array.push(num);
    }
  }
  return array;
}

function findTypes(...params) {
  const obj = {};
  for (let value of params) {
    let type = typeof value;
    if (typeof obj[type] === 'undefined') {
      obj[type] = 1;
      continue;
    }
    obj[type]++;
  }
  return obj;
}

function executeforEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function mapArray(arr, fn) {
  const array = [];
  executeforEach(arr, function(el) {
    array.push(fn(el));
  });
  return array;
}

function filterArray(arr, fn) {
  const array = [];
  executeforEach(arr, function(el) {
    if (fn(el)) {
      array.push(el);
    }
  });
  return array;
}

function showFormattedDate(date) {
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `Date: ${monthName[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

function canConvertToDate(date) {
  const dt = new Date(date);
  return !isNaN(dt.getTime());
}

function daysBetween(initialDate, finalDate) {
  const secondsInDay = 86400;
  const milliseconds = 1000;
  return Math.round(Math.abs(finalDate - initialDate) / (secondsInDay * milliseconds));
}

function getAmountOfAdultPeople(data) {
  const adultAge = 18;
  const daysInYear = 365;
  const today = new Date();
  const amountOfAdult = filterArray(data, function(el) {
    for (let key in el) {
      if (key.trim() === 'birthday') {
        let birthday = new Date(el[key]);
        return Math.floor(daysBetween(birthday, today) / daysInYear) > adultAge;
      }
    }
  });
  return amountOfAdult.length;
}

function keys(obj) {
  const array = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      array.push(prop);
    }
  }
  return array;
}

function values(obj) {
  const array = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      array.push(obj[prop]);
    }
  }
  return array;
}
