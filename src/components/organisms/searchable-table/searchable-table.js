// import sheet from './searchable-table.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./searchable-table.css";

import { Text } from "../../atoms/text/text.js";
import { Input } from "../../atoms/input/input.js";
import { Table } from "../../atoms/table/table.js";
import { debounce } from "../../../lib/index.js";

export class SearchableTable {
  constructor({ data, title, errorText }) {
    this.state = {
      data: undefined, // { task: string, completed: boolean }[]
      title: undefined, // string
      errorText: undefined, // string
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    const debounced = debounce(this.handleOnInput, 250);

    this.container = document.createElement("div");
    this.container.classList.add("searchable-table-container");

    this.top = document.createElement("div");
    this.top.classList.add("searchable-table-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "searchable-table-title" });
    this.top.appendChild(this.header.render());

    this.input = new Input({
      id: "search-input",
      type: "search",
      placeholder: "Start typing..",
      onInput: debounced,
    });
    this.top.appendChild(this.input.render());

    this.table = new Table({
      title: "data table",
      onClick: this.handleOnClick,
    });
    this.container.appendChild(this.table.render());

    this.update({ data, title, errorText });

    if (data && data.length > 0) {
      this.table.rebuild();
    }
  }

  update({ data, title, errorText }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (errorText !== undefined) {
      this.state.errorText = errorText;
      this.table.update({ emptyTableText: this.state.errorText });
    }

    if (data !== undefined) {
      this.state.data = [...data];
      this.table.update({ data: this.state.data });
    }
  }

  handleOnInput(e) {
    let items;
    if (!e.target.value) {
      items = [...this.state.data];
    } else {
      const searchterm = e.target.value.trim().toLowerCase();
      items = this.state.data.filter((row) => {
        return (
          Object.values(row).filter((cell) =>
            cell.toLowerCase().includes(searchterm)
          ).length > 0
        );
      });
    }

    this.table.update({ data: items });
    this.table.rebuild();
    this.table.render();
  }

  handleOnClick(e) {
    switch (e.target.tagName) {
      case "TH":
        // console.log("header click", e.target.textContent);
        break;
      default:
      // console.log("body click", e.target.textContent);
    }
  }

  render() {
    this.header.render();
    this.table.render();
    return this.container;
  }
}
