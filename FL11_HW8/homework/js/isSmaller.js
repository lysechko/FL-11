function isBigger(a, b) {
  return a > b;
}

function isSmaller(a, b) {
  if (a === b) {
    return false;
  } else {
    return !isBigger(a, b);
  }
}

isSmaller(5, -1);
