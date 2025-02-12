export function gameController(realPlayer, computerPlayer) {
  function playerAttack(x, y) {
    let attackResult = computerPlayer.receiveAttack(x, y);
    return attackResult;
  }

  function computerAttack() {
    let coordinates = validCoordinates();
    let x = coordinates[0];
    let y = coordinates[1];
    let attackResult = realPlayer.receiveAttack(x, y);
    return [attackResult, x, y];
  }

  function isAllShipsSunk(player) {
    return player.isAllShipsSunk();
  }

  return { playerAttack, computerAttack, isAllShipsSunk };
}

function randomCoordinates() {
  return Math.floor(Math.random() * 10);
}

let previousCoordinates = [];

function validCoordinates() {
  let x;
  let y;
  do {
    x = randomCoordinates();
    y = randomCoordinates();
  } while (previousCoordinates.includes(`${x}${y}`) === true);
  previousCoordinates.push(`${x}${y}`);
  return [x, y];
}
