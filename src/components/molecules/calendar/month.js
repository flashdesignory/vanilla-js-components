// import sheet from './month.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./month.css";

import { MONTHS } from "./constants.js";
import { Button } from "../../atoms/button/button.js";
import { ArrowLeft } from "../../../assets/arrow-left.js";
import { ArrowRight } from "../../../assets/arrow-right.js";
import { Text } from "../../atoms/text/text";

export class DisplayMonth {
  constructor({ actualDate }) {
    this.state = {
      displayDate: undefined, // date
    };

    this.actualDate = actualDate; // date
    this.items = [];

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("month-container");

    this.header = document.createElement("div");
    this.header.classList.add("header");
    this.container.appendChild(this.header);

    this.body = document.createElement("div");
    this.body.classList.add("body");
    this.container.appendChild(this.body);

    this.nextButton = new Button({
      type: "icon",
      label: ArrowRight({ width: "24", height: "24" }),
      onClick: this.handleNextClick,
      containerClass: "next-button",
    });
    this.prevButton = new Button({
      type: "icon",
      label: ArrowLeft({ width: "24", height: "24" }),
      onClick: this.handlePrevClick,
      containerClass: "prev-button",
    });

    this.title = new Text({ containerClass: "month-title" });

    this.header.appendChild(this.prevButton.render());
    this.header.appendChild(this.title.render());
    this.header.appendChild(this.nextButton.render());

    this.update({ displayDate: new Date(actualDate) });
    this.rebuild();
  }

  handlePrevClick() {
    const newDate = new Date(this.state.displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.update({ displayDate: new Date(newDate) });
    this.rebuild();
    this.render();
  }

  handleNextClick() {
    const newDate = new Date(this.state.displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.update({ displayDate: new Date(newDate) });
    this.rebuild();
    this.render();
  }

  update({ displayDate }) {
    if (displayDate !== undefined) {
      this.state.displayDate = displayDate;
      // always set it to the first of the month
      this.state.displayDate.setDate(1);
    }
  }

  rebuild() {
    this.items = [];
    this.title.update({ text: MONTHS[this.state.displayDate.getMonth()] });

    const lastDayCurrentMonth = new Date(
      this.state.displayDate.getFullYear(),
      this.state.displayDate.getMonth() + 1,
      0
    ).getDate();

    const lastDayPreviousMonth = new Date(
      this.state.displayDate.getFullYear(),
      this.state.displayDate.getMonth(),
      0
    ).getDate();

    const firstDayIndex = this.state.displayDate.getDay();
    let remainingCells = 42;

    for (let i = firstDayIndex; i > 0; i--) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "prev-month");
      cell.textContent = lastDayPreviousMonth - i + 1;
      this.items.push(cell);
      remainingCells--;
    }

    for (let i = 1; i <= lastDayCurrentMonth; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "current-month");
      cell.textContent = i;

      if (
        i === this.actualDate.getDate() &&
        this.state.displayDate.getMonth() === this.actualDate.getMonth() &&
        this.state.displayDate.getFullYear() === this.actualDate.getFullYear()
      ) {
        cell.classList.add("today");
      }

      remainingCells--;

      this.items.push(cell);
    }

    for (let i = 1; i <= remainingCells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "next-month");
      cell.textContent = i;
      this.items.push(cell);
    }
  }

  render() {
    this.body.replaceChildren();

    this.title.render();

    this.items.forEach((item) => this.body.appendChild(item));
    return this.container;
  }
}
