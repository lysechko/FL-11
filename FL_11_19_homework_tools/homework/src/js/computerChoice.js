const getComputerChoice = val => {
  return val.sort((a, b) => 0.5 - Math.random()).pop();
};

export default getComputerChoice;
