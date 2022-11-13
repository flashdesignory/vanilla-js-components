// import sheet from './autocomplete.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./autocomplete.css";

import { Text } from "../../atoms/text/text.js";
import { Input } from "../../atoms/input/input.js";
import { List } from "../../atoms/list/list.js";
import { debounce } from "../../../lib/utils.js";

export class AutoComplete {
  constructor({ data = [], title, errorText }) {
    this.state = {
      data: [],
      title: undefined, // string
      errorText: undefined, // string
    };

    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    const debounced = debounce(this.handleOnInput, 250);

    this.container = document.createElement("div");
    this.container.classList.add("static-autocomplete-container");

    this.top = document.createElement("div");
    this.top.classList.add("autocomplete-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "autocomplete-title" });
    this.top.appendChild(this.header.render());

    this.input = new Input({
      id: "search-input",
      type: "text",
      placeholder: "Start typing..",
      onInput: debounced,
    });
    this.top.appendChild(this.input.render());

    this.list = new List({
      onClick: this.handleOnClick,
      title: "results list",
      role: "listbox",
    });
    this.container.appendChild(this.list.render());

    this.update({ data, title, errorText });
  }

  update({ data, title, errorText }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (errorText !== undefined) {
      this.state.errorText = errorText;
      this.list.update({ emptyListText: this.state.errorText });
    }

    if (data !== undefined) {
      this.state.data = [...data];
    }
  }

  handleOnInput(e) {
    let items;

    if (!e.target.value) {
      items = [];
    } else {
      items = this.state.data.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    this.list.update({ data: items });
    this.list.rebuild();
    this.list.render();
  }

  handleOnClick(e) {
    if (!e.target.textContent || e.target.role !== "option") return;

    this.input.update({ value: e.target.textContent });
    this.input.render();

    this.list.update({ data: [] });
    this.list.rebuild();
    this.list.render();
  }

  render() {
    this.header.render();
    return this.container;
  }
}
