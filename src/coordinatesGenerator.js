// export function generateValidCoordinates(board, shipLength) {
//   let x = generateRandomCoordinate();
//   let y = generateRandomCoordinate();
//   if (testHorizontal(board, shipLength, x, y) === false) {
//     generateValidCoordinates(board, shipLength);
//   }
//   if (testVertical(board, shipLength, x, y) === false) {
//     generateValidCoordinates(board, shipLength);
//   }
//   let direction = generateRandomDirection();
//   return {
//     x,
//     y,
//     direction,
//   };
// }

export function generateValidCoordinates(board, shipLength) {
  let isValid = false;
  let x;
  let y;
  let direction;

  // while not a valid coordinate keep generating randomCoordinates
  do {
    x = generateRandomCoordinate();
    y = generateRandomCoordinate();
    direction = generateRandomDirection();
    if (direction === "horizontal") {
      if (testHorizontal(board, shipLength, x, y) === true) {
        isValid = true;
      }
    } else {
      if (testVertical(board, shipLength, x, y) === true) {
        isValid = true;
      }
    }
  } while (isValid === false);
  return {
    x,
    y,
    direction,
  };
}

function generateRandomDirection() {
  let direction = Math.floor(Math.random() * 2);
  if (direction === 1) {
    return "horizontal";
  } else {
    return "vertical";
  }
}

function generateRandomCoordinate() {
  return Math.floor(Math.random() * 9); // board is size 10, so the array is from 0 to 9
}

function testVertical(board, shipLength, x, y) {
  let length = shipLength + x - 1;
  if (length > 9) {
    return false;
  }
  for (let i = x; i < length; i++) {
    if (board[i][y] !== 0) {
      return false;
    }
  }
  return true;
}

function testHorizontal(board, shipLength, x, y) {
  let length = shipLength + y - 1;
  if (length > 9) {
    return false;
  }
  for (let i = y; i < length; i++) {
    if (board[x][i] !== 0) {
      return false;
    }
  }
  return true;
}
