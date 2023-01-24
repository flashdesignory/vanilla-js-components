import { Button } from "../../atoms/button/button.js";
import { Checkbox } from "../../atoms/checkbox/checkbox";

export class TodoItem {
  constructor({ name, item, onChange, onDelete }) {
    this.state = {
      name: undefined, // string
      item: undefined, // { task: string, completed: boolean, id: string }
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
      variant: "primary",
      label: "delete",
      onClick: this.handleOnClick,
    });
    this.container.appendChild(this.button.render());

    this.update({ name, item });
  }

  update({ name, item }) {
    if (name !== undefined) this.state.name = name;
    if (item !== undefined) this.state.item = { ...item };

    this.input.update({
      id: this.state.item.id,
      name: this.state.name,
      label: this.state.item.task,
      checked: this.state.item.completed,
    });
  }

  handleOnChange(e) {
    const completed = e.target.checked;
    this.state.item = { ...this.state.item, completed };
    this.onChange(this.state.item);
  }

  handleOnClick() {
    this.onDelete(this.state.item, this.container);
  }

  render() {
    this.input.render();

    return this.container;
  }
}
