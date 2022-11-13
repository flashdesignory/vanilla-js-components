// import sheet from './checkbox.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./checkbox.css";
import { Checkbox } from "./checkbox.js";

export class CheckboxGroup {
  constructor({ data, name, onChange }) {
    this.state = {
      data: undefined, // array of input props
      name: undefined, // string
    };

    this.onChange = onChange;
    this.update({ data, name });
  }

  update({ data, name }) {
    if (data !== undefined) this.state.data = data;
    if (name !== undefined) this.state.name = name;

    this.inputs = this.state.data.map((item) => {
      const checkbox = new Checkbox({
        name: this.state.name,
        label: item,
        id: item,
        onChange: this.onChange,
      });
      return checkbox;
    });
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("input-group-container");

    this.inputs.map((input) => {
      container.appendChild(input.render());
    });

    return container;
  }
}
