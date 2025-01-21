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

export function gameBoard() {
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
  let ships = () => {
    let carrier = generateBoat().carrier;
    let battleShip = generateBoat().battleShip;
    let destroyer = generateBoat().destroyer;
    let submarine = generateBoat().submarine;
    let patrolBoat = generateBoat().patrolBoat;
    return { carrier, battleShip, destroyer, submarine, patrolBoat };
  };

  const placeBoats = () => {
    (function placeCarrier() {
      let length = ships().carrier.shipLength;
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
      let length = ships().battleShip.shipLength;
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
      let length = ships().destroyer.shipLength;
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
      let length = ships().submarine.shipLength;
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
      let length = ships().patrolBoat.shipLength;
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
  placeBoats();

  const receiveAttack = (x, y) => {
    if (board[x][y] !== 0) {
      switch (board[x][y]) {
        case "C":
          ships().carrier.hit();
          break;

        case "B":
          ships().battleShip.hit();
          break;

        case "D":
          ships().destroyer.hit();
          break;

        case "S":
          ships().submarine.hit();
          break;

        case "P":
          ships().patrolBoat.hit();
          break;

        default:
          break;
      }
      board[x][y] === "h";
    } else {
      board[x][y] === "m";
    }
  };
  return {
    ships,
    receiveAttack,
  };
}
