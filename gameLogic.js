import { generateValidCoordinates } from "./coordinatesGenerator.js";

function shipFactory(length) {
  let shipLength = length;
  let shipHull = shipLength;
  const hit = () => shipHull--;
  const isSunk = () => (shipHull <= 0 ? true : false);

  return {
    shipLength,
    hit,
    isSunk,
  };
}

function generateBoat() {
  const carrier = shipFactory(5);
  const battleShip = shipFactory(4);
  const destroyer = shipFactory(3);
  const submarine = shipFactory(3);
  const patrolBoat = shipFactory(2);

  return {
    carrier,
    battleShip,
    destroyer,
    submarine,
    patrolBoat,
  };
}

function gameBoard() {
  let board = [];
  let boardSize = 10;
  const generateBoard = (function () {
    for (let i = 0; i < boardSize; i++) {
      board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        board[i].push(0);
      }
    }
  })();

  //Ships

  let carrier = generateBoat().carrier;
  let battleShip = generateBoat().battleShip;
  let destroyer = generateBoat().destroyer;
  let submarine = generateBoat().submarine;
  let patrolBoat = generateBoat().patrolBoat;

  const placeBoats = () => {
    (function placeCarrier() {
      let length = carrier.shipLength;
      let coordinates = generateValidCoordinates(board, length);
      if (coordinates.direction === "horizontal") {
        for (let i = coordinates.y; i < coordinates.y + length; i++) {
          board[coordinates.x][i] = "C";
        }
      } else {
        for (let i = coordinates.x; i < coordinates.x + length; i++) {
          board[i][coordinates.y] = "C";
        }
      }
    })();
    (function placeBattleShip() {
      let length = battleShip.shipLength;
      let coordinates = generateValidCoordinates(board, length);
      if (coordinates.direction === "horizontal") {
        for (let i = coordinates.y; i < coordinates.y + length; i++) {
          board[coordinates.x][i] = "B";
        }
      } else {
        for (let i = coordinates.x; i < coordinates.x + length; i++) {
          board[i][coordinates.y] = "B";
        }
      }
    })();
    (function placeDestroyer() {
      let length = destroyer.shipLength;
      let coordinates = generateValidCoordinates(board, length);
      if (coordinates.direction === "horizontal") {
        for (let i = coordinates.y; i < coordinates.y + length; i++) {
          board[coordinates.x][i] = "D";
        }
      } else {
        for (let i = coordinates.x; i < coordinates.x + length; i++) {
          board[i][coordinates.y] = "D";
        }
      }
    })();
    (function placeSubmarine() {
      let length = submarine.shipLength;
      let coordinates = generateValidCoordinates(board, length);
      if (coordinates.direction === "horizontal") {
        for (let i = coordinates.y; i < coordinates.y + length; i++) {
          board[coordinates.x][i] = "S";
        }
      } else {
        for (let i = coordinates.x; i < coordinates.x + length; i++) {
          board[i][coordinates.y] = "S";
        }
      }
    })();
    (function placePatrolBoat() {
      let length = patrolBoat.shipLength;
      let coordinates = generateValidCoordinates(board, length);
      if (coordinates.direction === "horizontal") {
        for (let i = coordinates.y; i < coordinates.y + length; i++) {
          board[coordinates.x][i] = "P";
        }
      } else {
        for (let i = coordinates.x; i < coordinates.x + length; i++) {
          board[i][coordinates.y] = "P";
        }
      }
    })();
  };

  const receiveAttack = (x, y) => {
    if (board[x][y] !== 0) {
      switch (board[x][y]) {
        case "C":
          carrier.hit();
          break;

        case "B":
          battleShip.hit();
          break;

        case "D":
          destroyer.hit();
          break;

        case "S":
          submarine.hit();
          break;

        case "P":
          patrolBoat.hit();
          break;

        default:
          break;
      }
      board[x][y] = "h";
      return "Hit";
    } else {
      board[x][y] = "m";
      return "Miss";
    }
  };

  const isAllShipsSunk = () => {
    let allSunk = false;
    if (
      carrier.isSunk() === true &&
      battleShip.isSunk() === true &&
      destroyer.isSunk() === true &&
      submarine.isSunk() === true &&
      patrolBoat.isSunk() === true
    ) {
      allSunk = true;
      return allSunk;
    } else {
      return allSunk;
    }
  };

  const devTestingMode = () => {
    // empty the board
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        board[i][j] = 0;
      }
    }

    // place each boat on a determinated position
    for (let i = 0; i < 5; i++) {
      board[0][i] = "C";
    }
    for (let i = 0; i < 4; i++) {
      board[1][i] = "B";
    }
    for (let i = 0; i < 3; i++) {
      board[2][i] = "D";
    }
    for (let i = 0; i < 3; i++) {
      board[3][i] = "S";
    }
    for (let i = 0; i < 2; i++) {
      board[4][i] = "P";
    }
  };

  placeBoats();

  return {
    receiveAttack,
    isAllShipsSunk,
    devTestingMode,
  };
}

const realPlayer = gameBoard();
const computerPlayer = gameBoard();
const testPlayer = gameBoard();
testPlayer.devTestingMode();

export { testPlayer };
