import { realPlayer } from "./gameLogic";
import { computerPlayer } from "./gameLogic";

const boardSize = 10;
// next steps are generate enemy board
// do a click event
// code for board changing both enemy and player
// function to gameOver

export function generateBoardInterface() {
  let playerBoard = document.querySelector("#player");
  let computerBoard = document.querySelector("#computer");
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let cell = createCell(`${i}${j}`, realPlayer.board[i][j], "human");
      playerBoard.appendChild(cell);
    }
  }
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let cell = createCell(`${i}${j}`, computerPlayer.board[i][j], "computer");
      computerBoard.appendChild(cell);
    }
  }
}

function createCell(cellId, text, typeOfPlayer) {
  let cell = document.createElement("div");
  if (typeOfPlayer === "human") {
    cell.setAttribute("id", "h" + cellId);
    cell.textContent = text;
    return cell;
  } else {
    // computer player
    cell.setAttribute("id", "c" + cellId);
    cell.textContent = text;
    return cell;
  }
}
