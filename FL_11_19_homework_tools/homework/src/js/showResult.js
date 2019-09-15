const showResult = (node, player, draw = false) => {
  const result = `<p class="result">${
    draw
      ? 'Draw'
      : player
      ? "CONGRATULATION! You're WON!"
      : "SORRY, You're LOST!"
  }</p>`;
  node.insertAdjacentHTML('afterend', result);
};

export default showResult;
