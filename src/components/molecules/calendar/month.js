// import sheet from './month.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./month.css";

import { MONTHS } from "./constants.js";
import { Button } from "../../atoms/button/button.js";
import { ArrowLeft } from "../../../assets/arrow-left.js";
import { ArrowRight } from "../../../assets/arrow-right.js";
import { Text } from "../../atoms/text/text";

export class DisplayMonth {
  constructor({ actualDate, onClick }) {
    this.state = {
      displayDate: undefined, // date
    };

    this.actualDate = actualDate; // date that was passed into constructor
    this.selectedDate = undefined; // date selected by user click
    this.items = [];
    this.onClick = onClick;

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);

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

    this.title = document.createElement("div");
    this.title.classList.add("month-title");

    this.monthName = new Text({ containerClass: "month-month-name" });
    this.yearName = new Text({ containerClass: "month-year-name" });
    this.title.appendChild(this.monthName.render());
    this.title.appendChild(this.yearName.render());

    this.header.appendChild(this.prevButton.render());
    this.header.appendChild(this.title);
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

  handleCellClick(e) {
    this.selectedDate = new Date(this.state.displayDate);
    this.selectedDate.setDate(e.target.textContent);
    if (this.onClick) this.onClick(this.selectedDate);

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
    this.items.forEach(item => item.removeEventListener("click", this.handleCellClick));
    this.items = [];

    this.monthName.update({ text: MONTHS[this.state.displayDate.getMonth()] });
    this.yearName.update({ text: this.state.displayDate.getFullYear() });

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
      cell.addEventListener("click", this.handleCellClick);

      if (
        i === this.actualDate.getDate() &&
        this.state.displayDate.getMonth() === this.actualDate.getMonth() &&
        this.state.displayDate.getFullYear() === this.actualDate.getFullYear()
      ) {
        cell.classList.add("today");
      }

      if (
        this.selectedDate !== undefined && 
        i === this.selectedDate.getDate() &&
        this.state.displayDate.getMonth() === this.selectedDate.getMonth() &&
        this.state.displayDate.getFullYear() === this.selectedDate.getFullYear()
      ) {
        cell.classList.add("selected");
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

    this.monthName.render();
    this.yearName.render();

    this.items.forEach((item) => this.body.appendChild(item));
    return this.container;
  }
}
