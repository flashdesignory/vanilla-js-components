import { Checkbox } from "../../atoms/checkbox/checkbox";
import { Text } from "../../atoms/text/text.js";

export class Option {
  constructor({ name, value, onChange }) {
    this.state = {};

    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);

    // container element
    this.container = document.createElement("div");
    this.container.classList.add("option-container");

    this.top = document.createElement("div");
    this.top.classList.add("top");
    this.container.appendChild(this.top);

    this.bottom = document.createElement("div");
    this.bottom.classList.add("bottom");
    this.container.appendChild(this.bottom);

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

    this.percent = new Text({ containerClass: "percentage" });
    this.percent.update({ text: "0%" });
    this.right.appendChild(this.percent.render());

    this.progress = document.createElement("div");
    this.progress.classList.add("progress");
    this.bottom.appendChild(this.progress);

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
    this.percent.update({ text: `${percentage}%` });
    this.percent.render();
    this.progress.style.width = `${percentage}%`;

    if (checked) {
      this.container.classList.add("selected");
    } else {
      this.container.classList.remove("selected");
    }
  }

  handleOnChange(e) {
    // multiple clicks keep input checked
    if (!this.input.checked) {
      this.input.checked = true;
    }

    this.onChange(e);
  }

  render() {
    return this.container;
  }
}
