// import sheet from './table.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./table.css";

import { BodyRow } from "./body-row.js";
import { HeaderRow } from "./header-row.js";

export class Table {
  constructor({ data, emptyTableText, title, onClick }) {
    this.state = {
      data: [], // unknown[]
      emptyTableText, // string
      title, // string
    };

    this.rows = [];
    this.columNames = [];
    this.onClick = onClick;
    this.sortKey = undefined;
    this.sortDirection = "asc";

    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("table-container");

    this.table = document.createElement("table");
    this.table.tabIndex = 0;
    this.container.appendChild(this.table);

    this.caption = document.createElement("caption");
    this.caption.classList.add("visually-hidden");
    this.table.appendChild(this.caption);
    this.header = document.createElement("thead");
    this.table.appendChild(this.header);
    this.body = document.createElement("tbody");
    this.table.appendChild(this.body);

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
    if (data !== undefined) {
      this.state.data = [...data];
    }

    if (emptyTableText !== undefined)
      this.state.emptyTableText = emptyTableText;

    if (title !== undefined) {
      this.state.title = title;
      this.caption.textContent = this.state.title;
    } else {
      this.caption.textContent = "";
    }
  }

  rebuild() {
    if (this.state.data !== undefined && this.state.data.length > 0) {
      this.columNames = Object.keys(this.state.data[0]);
      if (this.sortKey === undefined) this.sortKey = this.columNames[0];
    } else {
      this.columNames = [];
    }

    this.sort();

    this.rows = [];
    this.state.data.forEach((entry) => {
      this.rows.push(new BodyRow({ data: entry, onClick: this.handleOnClick }));
    });
  }

  sort() {
    if (this.sortKey === undefined) return;
    const reverse = this.sortDirection === "asc" ? 1 : -1;

    const sortedData = [...this.state.data].sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) return -1 * reverse;
      if (a[this.sortKey] > b[this.sortKey]) return 1 * reverse;
      return 0;
    });

    this.state.data = [...sortedData];
  }

  handleOnClick(e) {
    if (e.target.tagName === "TH") {
      if (this.sortKey === e.target.textContent) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortDirection = "asc";
      }

      this.sortKey = e.target.textContent;

      this.rebuild();
      this.render();
    }

    if (this.onClick) this.onClick(e);
  }

  render() {
    this.container.replaceChildren();

    if (this.rows?.length > 0) {
      this.header.replaceChildren();
      this.header.appendChild(
        new HeaderRow({
          data: this.columNames,
          onClick: this.handleOnClick,
          sortKey: this.sortKey,
          sortDirection: this.sortDirection,
        }).render()
      );

      this.body.replaceChildren();
      this.rows.forEach((row) => {
        this.body.appendChild(row.render());
      });
      this.container.appendChild(this.table);
    } else {
      this.message.textContent = this.state.emptyTableText;
      this.container.appendChild(this.message);
    }

    return this.container;
  }
}
