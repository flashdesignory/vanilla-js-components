// import sheet from './radio-button.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./radio-button.css";

export class RadioButton {
  constructor({ id, name, label, onChange, checked }) {
    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.update({ id, name, label, checked });
  }

  update({ id, name, label, checked }) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.checked = checked;
  }

  handleOnChange(e) {
    if (this.onChange) this.onChange(e);
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("radio-button-container");
    const input = document.createElement("input");
    input.classList.add("input");
    input.id = this.id;
    input.name = this.name;
    input.type = "radio";
    input.checked = this.checked;
    input.addEventListener("change", this.handleOnChange);
    container.appendChild(input);

    if (this.label) {
      const label = document.createElement("label");
      label.classList.add("label");
      label.htmlFor = this.id;
      label.textContent = this.label;
      container.appendChild(label);
    }

    return container;
  }
}
