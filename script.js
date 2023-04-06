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
  const isSpotTaken = (index) => {
    return board[index];
  };
  const isDraw = () => {
    return board.every((elt) => {
      return elt != null;
    });
  };
  const isWin = () => {
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
  return { board, addMark, isSpotTaken, isDraw, isWin };
})();

const player = (name, symbol) => {
  // factory function
  const makeMove = (index) => {
    gameBoard.addMark(symbol, index);
  };
  return { name, symbol, makeMove };
};

const gameController = (() => {
  // module pattern
  let player1;
  let player2;
  let activePlayer;
  const setPlayers = (p1, p2) => {
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
    if (gameBoard.isSpotTaken(index)) {
      return null;
    }
    activePlayer.makeMove(index);
    const mark = activePlayer.symbol;
    if (gameBoard.isWin()) {
      // alerts don't work, too fast!!
      userInterface.disableBoard();
      alert(`Congrats ${activePlayer.name}, you win!`);
    } else if (gameBoard.isDraw()) {
      userInterface.disableBoard();
      alert("It's a draw! Click reset to play again.");
    } else {
      switchPlayer();
    }
    return mark;
  };
  return { setPlayers, sendMove };
})();

const userInterface = (() => {
  const player1Display = document.querySelector('#p1');
  const player2Display = document.querySelector('#p2');
  const submitButton = document.querySelector('.submit');
  submitButton.addEventListener('click', () => {
    const player1 = player(player1Display.value, 'X');
    const player2 = player(player2Display.value, 'O');
    gameController.setPlayers(player1, player2);
    player1Display.readOnly = true;
    player2Display.readOnly = true;
    submitButton.disabled = true;
    enableBoard();
  });
  const spots = document.querySelectorAll('.spot');
  const enableBoard = () => {
    const spotsArray = [...spots];
    spots.forEach((square) => {
      square.addEventListener('click', () => {
        const mark = gameController.sendMove(spotsArray.indexOf(square));
        if (mark != null) {
          square.textContent = mark;
        } else {
          // only want this to fire if game didn't just finish...
          alert('This spot is taken, try again in an open spot');
        }
      });
    });
  };
  // need to implement reset button...
  const disableBoard = () => {
    spots.forEach((square) => {
      // this is acting wacky...
      square.style.pointerEvents = 'none';
    });
  };
  return { disableBoard };
})();
