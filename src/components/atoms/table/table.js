// import sheet from './table.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./table.css";

import { Row } from "./row.js";

export class Table {
  constructor({ data, emptyTableText, title }) {
    this.state = {
      data: [], // unknown[]
      emptyTableText, // string
      title, // string
    };

    this.rows = [];

    this.container = document.createElement("div");
    this.container.classList.add("table-container");

    this.table = document.createElement("table");
    this.table.tabIndex = 0;
    this.container.appendChild(this.table);

    this.message = document.createElement("div");
    this.message.classList.add("table-message");

    this.update({
      data,
      emptyTableText,
      title,
    });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data, emptyTableText, title }) {
    if (data !== undefined) this.state.data = [...data];
    if (emptyTableText !== undefined)
      this.state.emptyTableText = emptyTableText;
    if (title !== undefined) this.state.title = title;
  }

  rebuild() {
    this.rows = [];
    this.state.data.forEach((entry) => {
      this.rows.push(new Row({ data: entry }));
    });
  }

  render() {
    this.container.replaceChildren();

    if (this.rows?.length > 0) {
      this.table.replaceChildren();

      this.rows.forEach((row) => {
        this.table.appendChild(row.render());
      });

      this.container.appendChild(this.table);
    } else {
      this.message.textContent = this.state.emptyTableText;
      this.container.appendChild(this.message);
    }

    return this.container;
  }
}
