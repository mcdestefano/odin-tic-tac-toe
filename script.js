const gameBoard = (() => {
  // module pattern
  const board = [];
  const addMark = (symbol, index) => {
    board[index] = symbol;
  };
  const isGameOver = () => {
    switch (true) {
      case board[0] === board[1] && board[1] === board[2]:
        // top row
        break;
      case board[3] === board[4] && board[4] === board[5]:
        // middle row
        break;
      case board[6] === board[7] && board[7] === board[8]:
        // bottom row
        break;
      case board[0] === board[3] && board[3] === board[6]:
        // left column
        break;
      case board[1] === board[4] && board[4] === board[7]:
        // center column
        break;
      case board[2] === board[5] && board[5] === board[8]:
        // right column
        break;
      case board[0] === board[4] && board[4] === board[8]:
        // diagonal, tl to br
        break;
      case board[2] === board[4] && board[4] === board[6]:
        // diagonal, tr to bl
        break;
      default:
        // not a game end state
        break;
    }
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
    const gameOver = gameBoard.isGameOver();
    if (gameOver) {
      // disable board and display winner
    } else {
      switchPlayer();
      // switch active player to other player
    }
  };
  return { activePlayer, displayGameState };
})();
