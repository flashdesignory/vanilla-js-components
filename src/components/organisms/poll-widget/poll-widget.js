// import sheet from './poll-widget.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./poll-widget.css";

import { Option } from "./option.js";
import { Text } from "../../atoms/text/text.js";

export class PollWidget {
  constructor({ title, name, data }) {
    this.state = {};
    this.elements = [];
    this.totalClicks = 0;
    this.clicks = {};

    this.handleOnChange = this.handleOnChange.bind(this);
    this.container = document.createElement("div");
    this.container.classList.add("pollwidget-container");

    this.header = new Text({ containerClass: "pollwidget-title" });
    this.container.appendChild(this.header.render());

    this.list = document.createElement("div");
    this.list.classList.add("pollwidget-list");
    this.container.appendChild(this.list);

    this.udpate({ title, name, data });
  }

  udpate({ title, name, data }) {
    if (title !== undefined) this.state.title = title;
    if (name !== undefined) this.state.name = name;
    if (data !== undefined) this.state.data = data;

    this.state.data.forEach((option) => {
      this.clicks[option] = 0;
    });

    this.header.update({ text: this.state.title });
  }

  handleOnChange(e) {
    this.totalClicks++;
    this.clicks[e.target.id] = this.clicks[e.target.id] + 1 || 1;
    console.log(this.totalClicks, this.clicks);

    this.elements.forEach((element) => {
      const checked = element.checked && element.value === e.target.id;
      const percentage = (
        (this.clicks[element.value] / this.totalClicks) *
        100
      ).toFixed(2);
      element.updateDisplay(checked, percentage);
    });
  }

  render() {
    this.header.render();

    this.state.data.forEach((option) => {
      const element = new Option({
        value: option,
        onChange: this.handleOnChange,
        name: this.state.name,
      });

      this.list.appendChild(element.render());
      this.elements.push(element);
    });

    return this.container;
  }
}
