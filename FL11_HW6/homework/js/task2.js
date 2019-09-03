const data = [];

for (let i = 0; i < 3; i++) {
  data[i] = Number(
    prompt(`Enter numeric value of ${i + 1} side of the triangle`)
  );
}

const [a, b, c] = data.sort();

if ([a, b, c].every(v => isFinite(v) && v > 0) && a + b > c) {
  console.log("Triangle exists");
  if (a === b && b === c) console.log("Equivalent triangle");
  else if (a === b || b === c || a === c) console.log("Isosceles triangle");
  else console.log("Normal triangle");
} else {
  console.log("Triangle doesn't exist");
}
