import showResult from './js/showResult';
import showStatus from './js/home';
import getComputerChoice from './js/computerChoice';

const values = ['Paper', 'Rock', 'Scissor'];
let computerScore = 0;
let playerScore = 0;
let computerChoice = '';
let round = 1;
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let userRoundWon = false;
let draw = false;

let userChoice = '';

let textArea = document.getElementById('text-area'),
  newGameButton = document.getElementById('new-game-button'),
  toggleButtons = document.getElementById('toggle');

showStatus(gameStarted, textArea);

const afterButton = (round, player, val1, val2, draw = false) => {
  const afterButton = `<span class="round">Round ${round}, ${val1} vs. ${val2}, ${
    draw ? 'Draw' : player ? "You're WON!" : "You'are LOST!"
  }</span>`;
  textArea.insertAdjacentHTML('afterend', afterButton);
};

const compare = (userchoice, computerchoice) => {
  draw = false;
  if (userchoice === computerchoice) {
    draw = true;
  }
  if (userchoice === 'Paper') {
    if (computerchoice === 'Rock') {
      playerScore++;
      userRoundWon = true;
    } else {
      if (computerchoice === 'Scissor') {
        computerScore++;
        userRoundWon = false;
      }
    }
  }
  if (userchoice === 'Scissor') {
    if (computerchoice === 'Rock') {
      computerScore++;
      userRoundWon = false;
    } else {
      if (computerchoice === 'Paper') {
        playerScore++;
        userRoundWon = true;
      }
    }
  }
  if (userchoice === 'Rock') {
    if (computerchoice === 'Scissor') {
      playerScore++;
    } else {
      if (computerchoice === 'Paper') {
        computerScore++;
        userRoundWon = false;
      }
    }
  }
};

const showGameArea = () => {
  if (gameStarted) {
    textArea.innerHTML = `
    <div>Wins:${wins}</div>
    <div id="toggle">
        <button class="rock">Rock</button>
        <button class="paper">Paper</button>
        <button class="scissor">Scissor</button>
        <span class="reset"><a href="">Reset</a></span>
    <div>`;
  }
};

function handleToggle(e) {
  const node = e.target;
  let computerChoice = getComputerChoice(values);

  if (node.nodeName === 'BUTTON') {
    userChoice = node.textContent;
    if (round <= 3) {
      compare(userChoice, computerChoice);
      afterButton(round++, userRoundWon, userChoice, computerChoice, draw);
    }
    if (round > 3) {
      const finalResult = playerScore > computerScore;
      if (playerScore === computerScore) {
        draw = true;
      }
      computerChoice = getComputerChoice(values);
      showResult(textArea, finalResult, draw);
      showGameArea();
      round = 0;
    }
    document.querySelectorAll('button').forEach(elem => {
      elem.disabled = true;
    });
  }
}

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  newGameButton.style.display = 'none';
  showGameArea();
  toggleButtons = document.getElementById('toggle');
  toggleButtons && toggleButtons.addEventListener('click', handleToggle);
  console.log(toggleButtons);
});
