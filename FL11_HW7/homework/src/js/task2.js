let game = confirm('Do you want to play a game');
if (game) {
  const base = 2;
  const min = 0;
  const maxOfRange = 8;
  const rangeAddend = 4;
  const prizeBase = 100;
  const countAttempt = 3;
  const resetValue = -1;
  let gain = 0;
  let max = maxOfRange;
  let multiplier = 1;
  let prize = prizeBase;
  let nextLevel = false;
  let restart = false;
  let attempt = 3;
  let pocketNumber = Math.floor(Math.random() * max + 1);
  let userNumber;
  for (let i = 0; i < countAttempt; i++) {
    userNumber = Number(
      prompt(`
    Choose a roulette pocket number from ${min} to ${max}
    Attempts left: ${attempt}
    Total prize: ${gain}$
    Possible prize on current attempt: ${prize}$
    `)
    );
    attempt--;
    if (pocketNumber === userNumber) {
      gain += prize;
      nextLevel = confirm(`Congratulation, you won! Your prize is: ${gain}$. Do you want to continue?`);
      if (nextLevel) {
        max += rangeAddend;
        multiplier *= base;
        prize = prizeBase * multiplier;
        attempt = countAttempt;
        pocketNumber = Math.floor(Math.random() * max + 1);
        i = resetValue;
        continue;
      } else {
        alert(`Thank you for your participation. Your prize is: ${gain}$`);
        break;
      }
    }
    if (attempt === 0) {
      restart = confirm('You lose! Do you want to start again?');
      if (restart) {
        i = resetValue;
        max = maxOfRange;
        gain = 0;
        prize = prizeBase;
        multiplier = 1;
        attempt = countAttempt;
        pocketNumber = Math.floor(Math.random() * max + 1);
        continue;
      } else {
        break;
      }
    } else {
      prize = prize / base;
    }
  }
} else {
  alert('You did not become a billionaire, but can');
}
