// BEAT THAT!
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Dice randomizing helper
var randomDiceRolls = function () {
  return Math.floor(Math.random() * 6) + 1;;
};

// Player Roll Dice
var playerRollDice = function () {
  var rollTimes = 2;
  playerDiceArray = [];
  for (let i = 0; i < rollTimes; i++) {
    playerDiceArray.push(randomDiceRolls());
  }
  return playerDiceArray;
};

var checkScore = function() {
  var winning;
  if (Number(scoreBoard[0]) > Number(scoreBoard[1])) {
    winning = 'Player 1 won!'
  } else {
    winning = 'Player 2 won!'
  }
  return `Player 1: ${scoreBoard[0]}, Player 2: ${scoreBoard[1]}, ${winning}`;
}

var arrangeSequence = function(array, input) { // [1,2]
  playerScore = `${array[Number(input[0])-1]}${array[Number(input[1])-1]}`
  scoreBoard[activePlayer] = playerScore;
}

var switchPlayer = function() {
  activePlayer = activePlayer === 0? 1 : 0;
  dice1.innerHTML = '';
  dice2.innerHTML = '';
}

var init = function() {
  activePlayer = 0;
  scoreBoard = [0,0];
  playerDiceArray = [];
  playerScore = 0;
  diceArray = [];
  title.innerHTML = `Player ${activePlayer+1}`;
  dice1.innerHTML = '';
  dice2.innerHTML = '';
  output.innerHTML = '';
}

// Global Variables
var playerDiceArray;
var playerScore;
var activePlayer = 0;
var scoreBoard = [0,0]
var diceArray;
var output = document.querySelector("#output-div");
var rollBtn = document.querySelector("#roll-btn");
var dice1 = document.querySelector("#dice1");
var dice2 = document.querySelector("#dice2");
var input = document.querySelector("#input-field");
var button = document.querySelector("#submit-button");
var title = document.querySelector("#player-title");
var restart = document.querySelector("#restart-btn");

var main = function () {

  rollBtn.addEventListener("click", function() {
    // get roll dice result , return in array , for eg [4,5];
    diceArray = playerRollDice();
    dice1.innerHTML = `Dice 1: ${diceArray[0]}`;
    dice2.innerHTML = `Dice 2: ${diceArray[1]}`
  })

  button.addEventListener("click", function () {
    dice1.innerHTML = '';
    dice2.innerHTML = '';

    // get user sequence input  
    // input form = first dice, second dice, for eg,2,1
    // split the input value to return sequence in array , for eg, ['2','1']
    // arrange the sequence to get the biggest number

    var sequence = input.value.split(',');
    var result = arrangeSequence(diceArray, sequence);
    input.value = ""; // clear input field


    if (activePlayer == 1) {
      result = checkScore();
      output.innerHTML = result;
    } else {
      switchPlayer();
      title.innerHTML = `Player ${activePlayer + 1}`
    }
  });
};

restart.addEventListener('click', function() {
  init();
})

