// import sheet from './autocomplete.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { Item } from "./item.js";

export class List {
  constructor({
    data,
    insertionMethod,
    onClick,
    emptyListText,
    ItemClass,
    title,
    role = "list",
  }) {
    this.state = {
      data: [], // unknown[]
      insertionMethod: undefined, // "append" | "prepend" | string | undefined
      emptyListText, // string
      ItemClass, // class
      title, // string
      role: undefined, // "listbox" | "list"
    };
    this.items = [];

    this.onClick = onClick;

    this.container = document.createElement("div");
    this.container.classList.add("list-container");

    this.list = document.createElement("ul");
    this.list.classList.add("list-ul");
    this.list.tabIndex = 0;
    if (this.onClick) {
      this.list.addEventListener("click", this.onClick);
    }
    this.container.appendChild(this.list);

    this.message = document.createElement("div");
    this.message.classList.add("list-message");

    this.update({
      data,
      insertionMethod,
      emptyListText,
      ItemClass,
      title,
      role,
    });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({
    data,
    insertionMethod = "replace",
    emptyListText,
    ItemClass,
    title,
    role,
  }) {
    if (ItemClass !== undefined) this.state.ItemClass = ItemClass;

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

    if (emptyListText !== undefined) this.state.emptyListText = emptyListText;
    if (title !== undefined) this.state.title = title;
    if (role !== undefined) this.state.role = role;
  }

  rebuild() {
    this.items = [];
    this.state.data.forEach((item) => {
      const elementRole = this.state.role === "listbox" ? "option" : "listitem";
      const element = this.state.ItemClass
        ? new this.state.ItemClass({ data: item, role: elementRole })
        : new Item({ label: item, role: elementRole });
      this.items.push(element);
    });
  }

  render() {
    this.container.replaceChildren();

    if (this.items?.length > 0) {
      this.list.replaceChildren();

      this.list.role = this.state.role;
      this.list.title = this.state.title || undefined;

      this.items.forEach((item) => {
        this.list.appendChild(item.render());
      });

      this.container.appendChild(this.list);
    } else {
      this.message.textContent = this.state.emptyListText;
      this.container.appendChild(this.message);
    }

    return this.container;
  }
}
