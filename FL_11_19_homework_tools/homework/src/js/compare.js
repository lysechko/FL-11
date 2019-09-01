const compare = (userchoice, computerchoice, draw = false) => {
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

export default compare;
