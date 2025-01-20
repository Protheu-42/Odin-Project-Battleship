import { gameBoard } from "./gameLogic";

test("basic ships", () => {
  expect(gameBoard().ships().carrier.shipLength).toBe(5);
});
