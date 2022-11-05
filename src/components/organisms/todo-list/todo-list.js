// import sheet from './todo-list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./todo-list.css";

import { Text } from '../../atoms/text/text.js';
import { InputForm } from '../../molecules/input-form/input-form.js';
import { TodoItem } from './todo-item.js';

export class TodoList {
  constructor({
    title, name, data,
  }) {
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.container = document.createElement('div');
    this.container.classList.add('todo-container');

    this.header = new Text({containerClass: "todo-title"});
    this.container.appendChild(this.header.render());

    const inputForm = new InputForm({
      onSubmit: this.addItem,
    })
    this.container.appendChild(inputForm.render());

    this.list = document.createElement('div');
    this.list.classList.add('todo-list');
    this.container.appendChild(this.list);

    this.update({ title, name, data });
  }

  update({ title, name, data }) {
    this.title = title;
    this.name = name;
    this.data = [...data];

    this.header.update({text: this.title });
  }

  updateItem(updatedItem) {
    this.data = this.data.map((item) => {
      const newItem = {
        ...item,
        completed: item.task === updatedItem.task ? updatedItem.completed : item.completed,
      };
      return newItem;
    });
  }

  deleteItem(deletedValue, deletedItem) {
    this.data = this.data.filter((item) => item.task !== deletedValue.task);
    this.list.removeChild(deletedItem);
  }

  addItem(e) {
    if (e.target.elements.input.value <= 0) return;

    const newItem = {
      task: e.target.elements.input.value,
      completed: false,
    };

    const element = new TodoItem({
      ref: this.list,
      value: newItem,
      onChange: this.updateItem,
      onDelete: this.deleteItem,
      name: this.name,
    });

    this.list.insertBefore(element.render(), this.list.childNodes[0]);
    this.data.push(newItem);
  }

  render() {
    this.header.render();

    this.data.forEach((item) => {
      const element = new TodoItem({
        value: item,
        onChange: this.updateItem,
        onDelete: this.deleteItem,
        name: this.name,
      });

      this.list.appendChild(element.render());
    });

    return this.container;
  }
}
