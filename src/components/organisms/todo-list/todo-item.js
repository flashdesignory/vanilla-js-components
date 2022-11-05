import { Button } from "../../atoms/button/button.js";
import { Checkbox } from "../../atoms/checkbox/checkbox";

export class TodoItem {
  constructor({ name, value, onChange, onDelete }) {
    this.onChange = onChange;
    this.onDelete = onDelete;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("todo-item-container");

    this.update({ name, value });
  }

  update({ name, value }) {
    this.name = name;
    this.value = { ...value };
  }

  handleOnChange(e) {
    const completed = e.target.checked;
    this.value = { ...this.value, completed };
    this.onChange(this.value);
  }

  handleOnClick() {
    this.onDelete(this.value, this.container);
  }

  render() {
    this.input = new Checkbox({
      id: this.value.task,
      name: this.name,
      label: this.value.task,
      onChange: this.handleOnChange,
      checked: this.value.completed,
    });
    this.container.appendChild(this.input.render());

    this.button = new Button({
      type: "primary",
      label: "delete",
      onClick: this.handleOnClick,
    });
    this.container.appendChild(this.button.render());

    return this.container;
  }
}
