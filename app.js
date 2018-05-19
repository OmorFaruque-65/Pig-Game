
var scores, roundScore, activePlayer, isGameRunnig, startPlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (isGameRunnig) {
    // random number

    var dice = Math.floor(Math.random() * 6) + 1;

    // display dice

    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';

    // show the random dice
    diceDom.src = 'dice-' + dice + '.png';

    if (dice !== 1) {
    // add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (isGameRunnig) {
    // add current score to the global score
    scores[activePlayer] += roundScore;

    // update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // setting the winning score
    var userInput = document.getElementById('winningScore').value;
    var winningScore;
    if (userInput) {
      winningScore = userInput;
    } else {
      winningScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      isGameRunnig = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer () {
  // next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
  scores = [0, 0];
  roundScore = 0;
  isGameRunnig = true;
  
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // reset

  document.getElementById('name-0').textContent = 'Player-1';
  document.getElementById('name-1').textContent = 'Player-2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  startPlayer = prompt('Starting Player \n 1 for player-1 \n 2 for player-2'); 
  
  if(startPlayer == 1){
    console.log(startPlayer);
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
  }else{
    activePlayer = 1;
    document.querySelector('.player-1-panel').classList.add('active');
  }
}
