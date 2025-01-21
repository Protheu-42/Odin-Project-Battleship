import { testPlayer } from "./gameLogic";
let receiveAttack = (x, y) => testPlayer.receiveAttack(x, y);
let isAllShipsSunk = () => testPlayer.isAllShipsSunk();

describe("Game basic logic tests", () => {
  test("Hit report", () => {
    expect(receiveAttack(0, 0)).toBe("Hit");
    expect(receiveAttack(0, 9)).toBe("Miss");
  });

  test("All ships sunk report", () => {
    hitAllShips();
    expect(isAllShipsSunk()).toBeTruthy();
  });
});

function hitAllShips() {
  for (let i = 0; i < 5; i++) {
    receiveAttack(0, i);
  }
  for (let i = 0; i < 4; i++) {
    receiveAttack(1, i);
  }

  for (let i = 0; i < 3; i++) {
    receiveAttack(2, i);
  }
  for (let i = 0; i < 3; i++) {
    receiveAttack(3, i);
  }
  for (let i = 0; i < 2; i++) {
    receiveAttack(4, i);
  }
}
