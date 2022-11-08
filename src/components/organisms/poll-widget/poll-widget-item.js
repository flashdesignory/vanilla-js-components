import { Button } from "../../atoms/button/button.js";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { Progress } from "../../atoms/progress/progress.js";

export class PollWidgetItem {
  constructor({ name, value, onChange }) {
    this.state = {};

    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    // container element
    this.container = document.createElement("div");
    this.container.classList.add("option-container");

    this.top = document.createElement("div");
    this.top.classList.add("top");
    this.container.appendChild(this.top);

    this.left = document.createElement("div");
    this.left.classList.add("left");
    this.top.appendChild(this.left);

    this.right = document.createElement("div");
    this.right.classList.add("right");
    this.top.appendChild(this.right);

    this.input = new Checkbox({
      id: value,
      name: name,
      label: value,
      onChange: this.handleOnChange,
    });
    this.left.appendChild(this.input.render());

    this.percent = new Button({
      type: "primary",
      onClick: this.handleOnClick,
      label: "0%",
    });
    this.right.appendChild(this.percent.render());

    this.progress = new Progress({
      percentage: 0,
      active: false,
    });
    this.container.appendChild(this.progress.render());

    this.update({ name, value });
  }

  get checked() {
    return this.input.checked;
  }

  get value() {
    return this.state.value;
  }

  update({ name, value }) {
    if (name !== undefined) this.state.name = name;
    if (value !== undefined) this.state.value = value;
  }

  updateDisplay(checked, percentage) {
    // console.log('updateDisplay', checked, percentage)
    this.input.update({ checked });
    this.percent.update({ label: `${percentage}%` });
    this.percent.render();
    this.progress.update({ percentage, active: checked });
    this.progress.render();
  }

  handleOnChange(e) {
    // multiple clicks keep input checked
    if (!this.input.checked) {
      this.input.checked = true;
    }

    this.onChange(e);
  }

  handleOnClick() {
    this.input.fireEvent();
  }

  render() {
    return this.container;
  }
}
