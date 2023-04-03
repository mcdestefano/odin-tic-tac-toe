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

const gameController = ((p1, p2) => {
  // module pattern
  let activePlayer = p1; // how to do players?
  const switchPlayer = () => {
    if (activePlayer === p1) {
      activePlayer = p2;
    } else {
      activePlayer = p1;
    }
  };
  const displayGameState = (index) => {
    gameBoard.addMark(activePlayer.symbol, index);
    let counter = 0;
    spots.forEach((square) => {
      square.textContent = gameBoard.board[counter];
      counter++;
    });
    if (gameBoard.isGameOver()) {
      // disable board and display winner...
    } else {
      switchPlayer();
    }
  };
  return { displayGameState };
})();

const spots = document.querySelectorAll('.spot');
const spotsArray = [...spots];
spots.forEach((square) => {
  square.addEventListener('click', () => {
    gameController.displayGameState(spotsArray.indexOf(square));
    // disable this event listener? or just add conditional?
  });
});
