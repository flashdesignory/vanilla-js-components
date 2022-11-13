// import sheet from './radio-button.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./radio-button.css";
import { RadioButton } from "./radio-button.js";

export class RadiobuttonGroup {
  constructor({ data, name, onChange }) {
    this.state = {
      data: undefined, // string[]
      name: undefined, // string
    };

    this.onChange = onChange;
    this.update({ data, name });
  }

  update({ data, name }) {
    if (data !== undefined) this.state.data = data;
    if (name !== undefined) this.state.name = name;

    this.inputs = this.state.data.map((item) => {
      const checkbox = new RadioButton({
        name: this.state.name,
        label: item,
        id: item,
        onChange: this.onChange,
        checked: false,
      });
      return checkbox;
    });
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("radio-button-group-container");

    this.inputs.map((input) => {
      container.appendChild(input.render());
    });

    return container;
  }
}
