// import sheet from './autocomplete.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./autocomplete.css";

import { Text } from "../../atoms/text/text.js";
import { Input } from "../../atoms/input/input.js";
import { debounce } from "../../../lib/utils.js";

export class AutoComplete {
  constructor({ data = [], title, errorText }) {
    this.state = { data: [] };

    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    const debounced = debounce(this.handleOnInput, 250);

    this.container = document.createElement("div");
    this.container.classList.add("autocomplete-container");

    this.header = new Text({ containerClass: "autocomplete-title" });
    this.container.appendChild(this.header.render());

    this.input = new Input({
      id: "search-input",
      type: "text",
      placeholder: "Start typing..",
      onInput: debounced,
    });
    this.container.appendChild(this.input.render());

    this.list = document.createElement("ul");
    this.list.classList.add("result-list");
    this.list.role = "listbox";
    this.list.addEventListener("click", this.handleOnClick);
    this.container.appendChild(this.list);

    this.update({ data, title, errorText });
  }

  update({ data, title, errorText }) {
    if (title !== undefined) this.state.title = title;
    if (errorText !== undefined) this.state.errorText = errorText;

    if (data !== undefined) {
      this.state.data = [...data];
    }

    this.header.update({ text: this.state.title });
  }

  handleOnInput(e) {
    this.list.replaceChildren();
    if (!e.target.value) return;

    const items = this.state.data.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    items.forEach((item) => {
      const element = document.createElement("li");
      element.classList.add("result-list-item");
      element.textContent = item;
      element.role = "option";
      this.list.appendChild(element);
    });

    if (items.length === 0) {
      const element = document.createElement("li");
      element.classList.add("result-list-error");
      element.textContent = this.state.errorText;
      element.classList.add("disabled");
      this.list.appendChild(element);
    }
  }

  handleOnClick(e) {
    if (!e.target.textContent || e.target.role !== "option") return;

    this.input.update({ value: e.target.textContent });
    this.input.render();
    this.list.replaceChildren();
  }

  render() {
    this.header.render();
    return this.container;
  }
}
