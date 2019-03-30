// Get elements from the DOM
const rockButton = document.getElementById('rock-button');
const paperButton = document.getElementById('paper-button');
const scissorsButton = document.getElementById('scissors-button');
const lizardButton = document.getElementById('lizard-button');
const spockButton = document.getElementById('spock-button');
const notificationCard = document.getElementById('notification-card');
const playerScore = document.getElementById('scoreboard-player-score');
const computerScore = document.getElementById('scoreboard-computer-score');
const ties = document.getElementById('scoreboard-ties');

// Game options
const options = {
  rock: { beats: ['scissors','lizard'] },
  paper: { beats: ['rock','spock'] },
  scissors: { beats: ['paper','lizard'] },
  lizard: { beats: ['spock','paper'] },
  spock: { beats: ['scissors','rock'] }
}

// Gameplay functions
const getComputerChoice = () => {
  const optionsArray = Object.keys(options);
  return optionsArray[Math.floor(Math.random() * optionsArray.length)];
}

const determineResult = (playerChoice, computerChoice) => {
  return (playerChoice === computerChoice) ? 'tie'
    : (options[playerChoice].beats.includes(computerChoice)) ? 'player wins'
    : (options[computerChoice].beats.includes(playerChoice)) ? 'computer wins'
    : 'undetermined';
}

const displayNotification = (notification, materializeColor) => {
  notificationCard.classList.remove('red', 'green', 'white');
  notificationCard.classList.add('card-panel', 'lighten-4', materializeColor);
  notificationCard.innerHTML = notification;
}

const increaseScoreByOne = score => {
  let value = Number(score.innerHTML);
  value++;
  score.innerHTML = value;
}

const play = (playerChoice, computerChoice) => {
  switch (determineResult(playerChoice, computerChoice)) {
    case 'tie':
      displayNotification(`Both you and the computer picked ${playerChoice}; the result is a tie. <i class="far fa-meh"></i>`, 'white');
      increaseScoreByOne(ties);
      break;
    case 'player wins':
      displayNotification(`You picked ${playerChoice}. The computer picked ${computerChoice}. You win! <i class="far fa-smile"></i>`, 'green');
      increaseScoreByOne(playerScore);
      break;
    case 'computer wins':
      displayNotification(`You picked ${playerChoice}. The computer picked ${computerChoice}. The computer wins. <i class="far fa-frown"></i>`, 'red');
      increaseScoreByOne(computerScore);
      break;
    default:
      displayNotification(`We couldn't determine the winner of this round. Please try again.`, 'white');
  }
}

// Event Listeners
rockButton.onclick = () => play('rock', getComputerChoice());
paperButton.onclick = () => play('paper', getComputerChoice());
scissorsButton.onclick = () => play('scissors', getComputerChoice());
lizardButton.onclick = () => play('lizard', getComputerChoice());
spockButton.onclick = () => play('spock', getComputerChoice());