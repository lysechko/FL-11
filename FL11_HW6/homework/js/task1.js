const data = [];
const point = ["a1", "a2", "b1", "b2", "c1", "c2"];
for (let i = 0; i < 6; i++) {
  data[i] = Number(
    prompt(
      `Please enter a numerical value corresponding to the coordinate ${
        point[i]
      }`
    )
  );
}

const [a1, a2, b1, b2, c1, c2] = data;

const cx = (a1 + b1) / 2;
const cy = (a2 + b2) / 2;

if (
  (a1 === b1 && a2 !== b2 && cx === c1 && cy === c2) ||
  (a1 !== b1 && a2 === b2 && cx === c1 && cy === c2) ||
  (a1 !== b1 && a2 !== b2 && cx === c1 && cy === c2)
) {
  console.log(true);
} else {
  console.log(false);
}
