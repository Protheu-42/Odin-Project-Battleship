import {
  realPlayer,
  computerPlayer,
  testPlayer,
  generateBoard,
} from "./gameLogic";

export function gameController() {
  let enemyBoard = createEmptyBoard();
  let gameOver = false;
  const real = realPlayer;
  const computer = testPlayer;
  let currentPlayer = real;
  do {
    if (currentPlayer === real) {
      printBothBoards(enemyBoard, real.printBoard);
      let xCoordinate = prompt("What is the X coordinate of attack");
      let yCoordinate = prompt("What is the Y coordinate of attack");
      let attackReport = computer.receiveAttack(xCoordinate, yCoordinate);
      console.log(`The player attack ${attackReport}`);
      enemyBoard[xCoordinate][yCoordinate] = attackReport;
      if (computer.isAllShipsSunk() === true) {
        gameOver = true;
        printBothBoards(enemyBoard, real.printBoard);
        console.log("All computer ships are sunken, the player won!");
      }
    } else {
      let xCoordinate = randomCoordinates();
      let yCoordinate = randomCoordinates();
      let attackReport = real.receiveAttack(xCoordinate, yCoordinate);
      console.log(`The computer attack ${attackReport}`);
      if (real.isAllShipsSunk() === true) {
        gameOver = true;
        printBothBoards(enemyBoard, real.printBoard);
        console.log("All player ships are sunken, the computer won!");
      }
      printBothBoards(enemyBoard, real.printBoard);
    }
    if (currentPlayer === real) {
      currentPlayer = computer;
    } else {
      currentPlayer = real;
    }
  } while (gameOver !== true);
}

function createEmptyBoard() {
  let board = [];
  generateBoard(board);
  return board;
}

function randomCoordinates() {
  return Math.floor(Math.random() * 9);
}

function printBothBoards(enemyBoard, playerBoard) {
  console.log("Enemy Board");
  console.table(enemyBoard);
  console.log("Player Board");
  playerBoard();
}
