// import sheet from './todo-list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./todo-list.css";

import { Text } from "../../atoms/text/text.js";
import { InputForm } from "../../molecules/input-form/input-form.js";
import { TodoItem } from "./todo-item.js";
import { hasValidMin } from "../../../lib/index.js";

export class TodoList {
  constructor({ title, name, data }) {
    this.state = {};
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("todo-container");

    this.header = new Text({ containerClass: "todo-title" });
    this.container.appendChild(this.header.render());

    const inputForm = new InputForm({
      onSubmit: this.addItem,
    });
    this.container.appendChild(inputForm.render());

    this.list = document.createElement("div");
    this.list.classList.add("todo-list");
    this.container.appendChild(this.list);

    this.update({ title, name, data });
  }

  update({ title, name, data }) {
    if (title !== undefined) this.state.title = title;
    if (name !== undefined) this.state.name = name;
    if (data !== undefined) this.state.data = [...data];
  }

  updateItem(updatedItem) {
    this.state.data = this.state.data.map((item) => {
      const newItem = {
        ...item,
        completed:
          item.task === updatedItem.task
            ? updatedItem.completed
            : item.completed,
      };
      return newItem;
    });
  }

  deleteItem(deletedValue, deletedItem) {
    this.state.data = this.state.data.filter(
      (item) => item.task !== deletedValue.task
    );
    this.list.removeChild(deletedItem);
  }

  addItem(e) {
    if (!hasValidMin(e.target.elements.input.value, 2)) return;

    const newItem = {
      task: e.target.elements.input.value,
      completed: false,
    };

    const element = new TodoItem({
      ref: this.list,
      value: newItem,
      onChange: this.updateItem,
      onDelete: this.deleteItem,
      name: this.state.name,
    });

    this.list.insertBefore(element.render(), this.list.childNodes[0]);
    this.state.data.push(newItem);
  }

  render() {
    this.header.update({ text: this.state.title });

    this.state.data.forEach((item) => {
      const element = new TodoItem({
        value: item,
        onChange: this.updateItem,
        onDelete: this.deleteItem,
        name: this.state.name,
      });

      this.list.appendChild(element.render());
    });

    return this.container;
  }
}
