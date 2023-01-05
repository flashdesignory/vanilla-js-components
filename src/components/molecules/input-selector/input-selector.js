// import sheet from './input-selector.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input-selector.css";

import { Button } from "../../atoms/button/button.js";
import { List } from "../../atoms/list/list.js";

export class InputSelector {
  constructor({ data, onChange, placeholder }) {
    this.state = {
      data: [], // unknown[]
    };

    this.onChange = onChange;
    this.isExpanded = false;
    this.selection = placeholder ?? "Select";

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleToggleKeyDown = this.handleToggleKeyDown.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleListKeyDown = this.handleListKeyDown.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("input-selector-container");

    this.trigger = new Button({
      variant: "primary",
      label: this.selection,
      onClick: this.handleToggleClick,
      containerClass: "input-selector-trigger",
    });
    this.container.appendChild(this.trigger.render());
    this.trigger.button.addEventListener("keydown", this.handleToggleKeyDown);

    this.dropdown = new List({
      onClick: this.handleItemClick,
      title: "selection list",
      emptyListText: "No items to select",
      role: "listbox",
    });
    this.container.appendChild(this.dropdown.render());
    this.dropdown.list.addEventListener("keydown", this.handleListKeyDown);

    this.update({ data });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data }) {
    if (data !== undefined) {
      this.state.data = [...data];
    }
  }

  rebuild() {
    if (this.state.data !== undefined) {
      this.dropdown.update({ data: this.state.data });
      this.dropdown.rebuild();
    }
  }

  getListItems() {
    const focusableListElements =
      this.dropdown.list.querySelectorAll('li[role="option"]') || [];
    const listItems = [...Array.from(focusableListElements)];
    return listItems;
  }

  handleToggleClick() {
    !this.isExpanded ? this.show() : this.hide();
  }

  handleToggleKeyDown(e) {
    if (e.key === "ArrowDown") {
      if (!this.isExpanded) {
        this.show();
      }
    }
  }

  handleItemClick(e) {
    const listItems = this.getListItems();
    console.log(e.target, listItems);
    listItems.forEach((item) =>
      item === e.target
        ? item.setAttribute("aria-selected", true)
        : item.removeAttribute("aria-selected")
    );
    this.selection = e.target.textContent;
    this.trigger.update({ label: this.selection });
    this.trigger.render();
    this.trigger.button.focus();
    this.hide();
    if (this.onChange) this.onChange(e);
  }

  handleListKeyDown(e) {
    const listItems = this.getListItems();
    let index = listItems.indexOf(document.activeElement);

    switch (e.key) {
      case "Enter":
        this.handleItemClick(e);
        return e.preventDefault();
      case "ArrowUp":
        if (index > 0) {
          listItems[index - 1].focus();
          return e.preventDefault();
        }
        return e.preventDefault();
      case "ArrowDown":
        if (index < listItems.length - 1) {
          listItems[index + 1].focus();
          return e.preventDefault();
        }
        return e.preventDefault();
      case "Tab":
        if (index >= 0) {
          this.trigger.button.focus();
          this.hide();
          return e.preventDefault();
        }
    }
  }

  show() {
    this.isExpanded = true;
    this.render();

    const listItems = this.getListItems();
    const selectedItem =
      listItems.find((item) => item.getAttribute("aria-selected") === "true") ||
      listItems[0];
    selectedItem.focus();
    selectedItem.scrollIntoView({ behavior: "smooth" });
  }

  hide() {
    this.isExpanded = false;
    this.render();
  }

  render() {
    if (this.isExpanded) {
      this.dropdown.container.classList.add("show");
    } else {
      this.dropdown.container.classList.remove("show");
    }

    this.dropdown.render();
    return this.container;
  }
}
