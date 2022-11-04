// import sheet from './radio-button.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./radio-button.css";
import { RadioButton } from "./radio-button.js";

export class RadiobuttonGroup {
  constructor({ data, name, onChange }) {
    this.onChange = onChange;
    this.update({ data, name });
  }

  update({ data, name }) {
    this.data = data;
    this.name = name;

    this.inputs = data.map((item) => {
      const checkbox = new RadioButton({
        name: this.name,
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
