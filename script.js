const gameBoard = (() => {
  // module pattern
  const board = [
    // lt
    null,
    // ct
    null,
    // rt
    null,
    // lc
    null,
    // cc
    null,
    // rc
    null,
    // lb
    null,
    // cb
    null,
    // rb
    null
  ];
  const addMark = (symbol, index) => {
    board[index] = symbol;
  };
  const isGameOver = () => {
    return (
      // top row
      (board[0] !== null && board[0] === board[1] && board[1] === board[2]) ||
      // middle row
      (board[3] !== null && board[3] === board[4] && board[4] === board[5]) ||
      // bottom row
      (board[6] !== null && board[6] === board[7] && board[7] === board[8]) ||
      // left column
      (board[0] !== null && board[0] === board[3] && board[3] === board[6]) ||
      // center column
      (board[1] !== null && board[1] === board[4] && board[4] === board[7]) ||
      // right column
      (board[2] !== null && board[2] === board[5] && board[5] === board[8]) ||
      // diagonal, lt to rb
      (board[0] !== null && board[0] === board[4] && board[4] === board[8]) ||
      // diagonal, rt to lb)
      (board[2] !== null && board[2] === board[4] && board[4] === board[6])
    );
  };
  return { board, addMark, isGameOver };
})();

const player = (name, symbol) => {
  // factory function
  const makeMove = (index) => {
    gameBoard.addMark(this.symbol, index);
  };
  return { name, symbol, makeMove };
};

const gameController = (() => {
  // module pattern
  let player1;
  let player2; // how to tie this to players created from button?
  let activePlayer;
  const getPlayers = (p1, p2) => {
    // not working...
    player1 = p1;
    player2 = p2;
    activePlayer = player1;
  };
  const switchPlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };
  const sendMove = (index) => {
    activePlayer.makeMove(index);
    if (gameBoard.isGameOver()) {
      // disable board and display winner...
    } else {
      switchPlayer();
    }
    return activePlayer.symbol;
  };
  return { player1, getPlayers, sendMove }; // player1 just for testing
})();

const userInterface = (() => {
  const playerSelection = document.querySelector('.player-selection');
  const player1Display = document.querySelector('#p1');
  const player2Display = document.querySelector('#p2');
  const submitButton = document.querySelector('.submit');
  submitButton.addEventListener('click', () => {
    const player1 = player(player1Display.value, 'X');
    const player2 = player(player2Display.value, 'O');
    gameController.getPlayers(player1, player2);
    playerSelection.ariaHidden = true; // not working right...
  });
  const spots = document.querySelectorAll('.spot');
  const spotsArray = [...spots];
  spots.forEach((square) => {
    square.addEventListener('click', () => {
      const mark = gameController.sendMove(spotsArray.indexOf(square));
      square.textContent = mark;
      // disable this event listener? or just add conditional?
    });
  });
})();
