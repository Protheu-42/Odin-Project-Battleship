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
    // function placeCarrier {
    // let coordinates = generateValidCoordinates()
    // if coordinates.direction === "horizontal"
    // for loop for horizontal implementation
    // else for loop for vertical implementation
  };
  placeBoats();

  return {
    ships,
  };
}

// gameBoard();
