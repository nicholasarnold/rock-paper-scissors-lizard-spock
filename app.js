// Get elements from the DOM
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const lizard = document.getElementById('lizard');
const spock = document.getElementById('spock');
const results = document.getElementById('results');
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

const updateScoreboard = score => {
  let value = Number(score.innerHTML);
  value++;
  score.innerHTML = value;
}

const determineAndDisplayResult = (playerChoice, computerChoice) => {
  let result;
  results.classList.add('card-panel', 'lighten-4');
  if (playerChoice === computerChoice) {
    result = `Both you and the computer picked ${playerChoice}; the result is a tie. <i class="far fa-meh"></i>`;
    results.classList.remove('green', 'red');
    updateScoreboard(ties);
  } else if (options[playerChoice].beats.includes(computerChoice)) {
    result = `You picked ${playerChoice}. The computer picked ${computerChoice}. You win! <i class="far fa-smile"></i>`;
    results.classList.remove('red');
    results.classList.add('green');
    updateScoreboard(playerScore);
  } else if (options[computerChoice].beats.includes(playerChoice)) {
    result = `You picked ${playerChoice}. The computer picked ${computerChoice}. The computer wins. <i class="far fa-frown"></i>`;
    results.classList.remove('green');
    results.classList.add('red');
    updateScoreboard(computerScore);
  } else {
    result = `We couldn't determine the winner of this round. Please try again.`;
  }
  results.innerHTML = result;
}

const play = playerChoice => {
  const computerChoice = getComputerChoice();
  determineAndDisplayResult(playerChoice, computerChoice);
}

// Event Listeners
rock.onclick = () => play('rock');
paper.onclick = () => play('paper');
scissors.onclick = () => play('scissors');
lizard.onclick = () => play('lizard');
spock.onclick = () => play('spock');