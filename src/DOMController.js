import { gameController } from "./gameController";
import { computerPlayer, realPlayer } from "./gameLogic";

const boardSize = 10;
export function generateBoardInterface(realPlayer, computerPlayer) {
  let playerBoard = document.querySelector("#player");
  let computerBoard = document.querySelector("#computer");
  // player board interface generate
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let cell = createCell(`${i}${j}`, realPlayer.board[i][j], "human");
      playerBoard.appendChild(cell);
    }
  }

  // computer board interface generate
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let cell = createCell(`${i}${j}`, computerPlayer.board[i][j], "computer");
      computerBoard.appendChild(cell);

      // Event Listener to get on the game
      cell.addEventListener(
        "click",
        (event) => {
          let attack = gameController(realPlayer, computerPlayer).playerAttack(
            i,
            j
          );
          changeCell(attack, cell.id);
          if (isGameOver(computerPlayer) === true) {
            return;
          }

          // do the computer attack
          let computerAttack = gameController(
            realPlayer,
            computerPlayer
          ).computerAttack();
          changeCell(
            computerAttack[0],
            `h${computerAttack[1]}${computerAttack[2]}`
          );
          if (isGameOver(realPlayer) === true) {
            return;
          }
        },
        { once: true }
      );
    }
  }
}

function createCell(cellId, text, typeOfPlayer) {
  let cell = document.createElement("div");
  if (typeOfPlayer === "human") {
    cell.setAttribute("id", "h" + cellId);

    if (text === 0) {
      //if is not a ship, doesn't need to be show
      cell.textContent = "";
    } else {
      cell.textContent = text;
    }
    return cell;
  } else {
    // computer player
    cell.setAttribute("id", "c" + cellId);
    cell.textContent = text; // hide computer ships
    return cell;
  }
}

function changeCell(result, cellId) {
  let cell = document.querySelector(`#${cellId}`);
  if (result === "Hit") {
    cell.style.backgroundColor = "red";
  } else {
    cell.style.backgroundColor = "blue";
  }
}

function isGameOver(player) {
  let result = gameController(realPlayer, computerPlayer).isAllShipsSunk(
    player
  );
  if (result === true) {
    let playerName;
    if (player === computerPlayer) {
      playerName = "Computer";
    } else {
      playerName = "You";
    }
    let body = document.querySelector("body");
    let div = document.createElement("div");
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    div.textContent = `${playerName} lost`;
    body.appendChild(div);
    return true;
  } else {
    console.log("Game Continues");
  }
}
