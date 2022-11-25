// import sheet from './tic-tac-toe.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./tic-tac-toe.css";

import { Button } from "../../components/atoms/button/button.js";
import { Text } from "../../components/atoms/text/text.js";
import {
  NUM_CELLS,
  PLAYER_O_CLASS,
  PLAYER_X_CLASS,
  WINNING_COMBINATIONS,
} from "./constants";

const isDraw = (elements) =>
  [...elements].every(
    (cell) =>
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
  );

const checkWin = (elements, currentClass) =>
  WINNING_COMBINATIONS.some((combination) =>
    combination.every((index) =>
      elements[index].classList.contains(currentClass)
    )
  );

export class TicTacToe {
  constructor({ title, buttonLabel }) {
    this.state = {
      title: undefined, // string
      buttonLabel: undefined, // string
    };

    this.isMoveOfPlayerO = false;

    this.start = this.start.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("tic-tac-toe-container");

    this.top = document.createElement("div");
    this.top.classList.add("tic-tac-toe-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "tic-tac-toe-title" });
    this.top.appendChild(this.header.render());

    this.button = new Button({
      label: "New Game",
      onClick: this.start,
      type: "primary",
      containerClass: "tic-tac-toe-button",
    });
    this.top.appendChild(this.button.render());

    this.board = document.createElement("div");
    this.board.classList.add("tic-tac-toe-board");
    this.container.appendChild(this.board);

    this.cells = [];
    for (let i = 0; i < NUM_CELLS; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.type = "cell";
      this.board.appendChild(cell);
      this.cells.push(cell);
    }

    this.message = new Text({
      containerClass: "tic-tac-toe-message",
      text: "Start a new Game!",
    });
    this.container.appendChild(this.message.render());

    this.update({ title, buttonLabel });
  }

  update({ title, buttonLabel }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (buttonLabel !== undefined) {
      this.state.buttonLabel = buttonLabel;
      this.button.update({ label: buttonLabel });
    }
  }

  setBoardHoverClass() {
    this.board.classList.remove(PLAYER_X_CLASS, PLAYER_O_CLASS);
    if (this.isMoveOfPlayerO) {
      this.board.classList.add(PLAYER_O_CLASS);
    } else {
      this.board.classList.add(PLAYER_X_CLASS);
    }
  }

  swapTurns() {
    this.isMoveOfPlayerO = !this.isMoveOfPlayerO;
  }

  setMessage(text) {
    this.message.update({ text: text });
    this.message.render();
  }

  placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  start() {
    this.isMoveOfPlayerO = false;
    this.cells.forEach((cell) => {
      cell.classList.remove(PLAYER_X_CLASS);
      cell.classList.remove(PLAYER_O_CLASS);
      cell.classList.remove("disabled");
      cell.removeEventListener("click", this.handleOnClick);
      cell.addEventListener("click", this.handleOnClick, { once: true });
    });
    this.setBoardHoverClass();
    this.setMessage(`Player ${this.isMoveOfPlayerO ? "O's" : "X's"} turn!`);
  }

  end(draw) {
    if (draw) {
      this.setMessage("It's a draw");
    } else {
      this.setMessage(
        `Player with ${this.isMoveOfPlayerO ? "O's" : "X's"} wins!`
      );
    }

    this.cells.forEach((cell) => {
      cell.removeEventListener("click", this.handleOnClick);
      cell.classList.add("disabled");
    });
  }

  handleOnClick(e) {
    const cell = e.target;
    const currentClass = this.isMoveOfPlayerO ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    this.placeMark(cell, currentClass);
    if (checkWin(this.cells, currentClass)) {
      this.end(false);
    } else if (isDraw(this.cells)) {
      this.end(true);
    } else {
      this.swapTurns();
      this.setBoardHoverClass();
      this.setMessage(`Player ${this.isMoveOfPlayerO ? "O's" : "X's"} turn!`);
    }
  }

  render() {
    this.header.render();
    this.button.render();
    this.message.render();

    return this.container;
  }
}
