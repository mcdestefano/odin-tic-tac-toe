const gameBoard = (() => {
  // module pattern
  const board = [];
  const addMark = (symbol, index) => {
    board[index] = symbol;
  };
  const isGameOver = () => {
    return (
      // top row
      (board[0] === board[1] && board[1] === board[2]) ||
      // middle row
      (board[3] === board[4] && board[4] === board[5]) ||
      // bottom row
      (board[6] === board[7] && board[7] === board[8]) ||
      // left column
      (board[0] === board[3] && board[3] === board[6]) ||
      // center column
      (board[1] === board[4] && board[4] === board[7]) ||
      // right column
      (board[2] === board[5] && board[5] === board[8]) ||
      // diagonal, tl to br
      (board[0] === board[4] && board[4] === board[8]) ||
      // diagonal, tr to bl)
      (board[2] === board[4] && board[4] === board[6])
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
  let activePlayer = p1;
  const switchPlayer = () => {
    if (activePlayer === p1) {
      activePlayer = p2;
    } else {
      activePlayer = p1;
    }
  };
  const displayGameState = () => {
    // update display with new mark
    if (gameBoard.isGameOver()) {
      // disable board and display winner
    } else {
      switchPlayer();
    }
  };
  return { activePlayer, displayGameState };
})();
