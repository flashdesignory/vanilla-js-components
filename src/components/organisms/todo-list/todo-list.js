// import sheet from './todo-list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./todo-list.css";

import { Text } from "../../atoms/text/text.js";
import { InputForm } from "../../molecules/input-form/input-form.js";
import { TodoItem } from "./todo-item.js";
import { hasValidMin } from "../../../lib/index.js";
import { useTodo } from "./use-todo.js";

export class TodoList {
  constructor({ title, name, data, prompt, submitText }) {
    this.state = {
      title: undefined, // string
      name: undefined, // string
      data: undefined, // { task: string, completed: boolean, id: string }[]
      prompt: undefined, // string
      submitText: undefined, // string
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("todo-container");

    this.header = new Text({ containerClass: "todo-title" });
    this.container.appendChild(this.header.render());

    this.inputForm = new InputForm({
      onSubmit: this.handleAddItem,
    });
    this.container.appendChild(this.inputForm.render());

    this.list = document.createElement("div");
    this.list.classList.add("todo-list");
    this.container.appendChild(this.list);

    this.update({ title, name, data, prompt, submitText });
  }

  update({ title, name, data, prompt, submitText }) {
    if (title !== undefined) this.state.title = title;
    if (name !== undefined) this.state.name = name;
    if (data !== undefined) this.state.data = [...data];
    if (prompt !== undefined) this.state.prompt = prompt;
    if (submitText !== undefined) this.state.submitText = submitText;

    this.header.update({ text: this.state.title });
    this.inputForm.update({
      placeholder: this.state.prompt,
      submitText: this.state.submitText,
    });
  }

  handleAddItem(e) {
    const value = e.target.elements.input.value.trim();
    if (!hasValidMin(value, 2)) return;

   const { addItem } = useTodo();
   this.update({ data: addItem(this.state.data, value )});

    const element = new TodoItem({
      ref: this.list,
      item: this.state.data[0],
      onChange: this.handleUpdateItem,
      onDelete: this.handleDeleteItem,
      name: this.state.name,
    });

    this.list.insertBefore(element.render(), this.list.childNodes[0]);
  }

  handleUpdateItem(item) {
    const { updateItem } = useTodo();
    this.update({ data: updateItem(this.state.data, item) });
  }

  handleDeleteItem(item, element) {
    const { deleteItem } = useTodo();
    this.update({ data: deleteItem(this.state.data, item.id )})
    this.list.removeChild(element);
  }

  render() {
    this.header.render();
    this.inputForm.render();

    this.state.data.forEach((item) => {
      const element = new TodoItem({
        item: item,
        onChange: this.handleUpdateItem,
        onDelete: this.handleDeleteItem,
        name: this.state.name,
      });

      this.list.appendChild(element.render());
    });

    return this.container;
  }
}
