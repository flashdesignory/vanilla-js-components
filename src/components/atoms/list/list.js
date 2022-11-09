// import sheet from './autocomplete.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { Item } from "./item.js";

export class List {
  constructor({ data, insertionMethod, onClick }) {
    this.state = { data: [] };
    this.items = [];

    this.onClick = onClick;

    this.container = document.createElement("div");
    this.container.classList.add("list-container");

    this.list = document.createElement("ul");
    this.list.classList.add("list-ul");
    this.list.tabIndex = 0;
    this.list.role = "listbox";
    if (this.onClick) {
      this.list.addEventListener("click", this.onClick);
    }
    this.container.appendChild(this.list);

    this.update({ data, insertionMethod });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data, insertionMethod = "replace" }) {
    if (data !== undefined) {
      switch (insertionMethod) {
        case "append":
          this.state.data = [...this.state.data, ...data];
          break;
        case "prepend":
          this.state.data = [...data, ...this.state.data];
          break;
        default:
          this.state.data = [...data];
      }
    }
  }

  rebuild() {
    this.items = [];
    this.state.data.forEach((item) => {
      const element = new Item({ label: item });
      this.items.push(element);
    });
  }

  render() {
    this.list.replaceChildren();

    this.items.forEach((item) => {
      this.list.appendChild(item.render());
    });

    return this.container;
  }
}
