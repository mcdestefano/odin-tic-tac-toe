const gameBoard = (() => {
  // module pattern
  const board = [];
  return { board };
})();

const player = (name, symbol) => {
  // factory function
  return { name, symbol };
};

const gameController = () => {
  // module pattern
};
