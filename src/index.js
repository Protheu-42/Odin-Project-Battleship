import "./styles.css";
import { computerPlayer, realPlayer } from "./gameLogic";
import { generateBoardInterface } from "./DOMController";

generateBoardInterface(realPlayer, computerPlayer);
