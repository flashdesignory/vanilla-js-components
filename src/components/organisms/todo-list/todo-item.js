import { Button } from "../../atoms/button/button.js";
import { Checkbox } from "../../atoms/checkbox/checkbox";

export class TodoItem {
  constructor({ name, value, onChange, onDelete }) {
    this.state = {
      name: undefined, // string
      value: undefined, // { task: string, completed: boolean }
    };

    this.onChange = onChange;
    this.onDelete = onDelete;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("todo-item-container");

    this.input = new Checkbox({
      onChange: this.handleOnChange,
    });
    this.container.appendChild(this.input.render());

    this.button = new Button({
      type: "primary",
      label: "delete",
      onClick: this.handleOnClick,
    });
    this.container.appendChild(this.button.render());

    this.update({ name, value });
  }

  update({ name, value }) {
    if (name !== undefined) this.state.name = name;
    if (value !== undefined) this.state.value = { ...value };

    this.input.update({
      id: this.state.value.task,
      name: this.state.name,
      label: this.state.value.task,
      checked: this.state.value.completed,
    });
  }

  handleOnChange(e) {
    const completed = e.target.checked;
    this.state.value = { ...this.state.value, completed };
    this.onChange(this.state.value);
  }

  handleOnClick() {
    this.onDelete(this.state.value, this.container);
  }

  render() {
    this.input.render();

    return this.container;
  }
}
