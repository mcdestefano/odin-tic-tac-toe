const gameBoard = (() => {
  // module pattern
  const board = [];
  const addMark = (symbol, index) => {
    board[index] = symbol;
  };
  return { board, addMark };
})();

const player = (name, symbol) => {
  // factory function
  const makeMove = (index) => {
    gameBoard.addMark(this.symbol, index);
  };
  return { name, symbol, makeMove };
};

const gameController = () => {
  // module pattern
  return {};
};
