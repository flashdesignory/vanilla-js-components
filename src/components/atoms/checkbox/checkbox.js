// import sheet from './checkbox.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./checkbox.css";

export class Checkbox {
  constructor({ id, name, label, onChange, checked }) {
    this.state = {
      id: undefined, // string
      name: undefined, // string
      label: undefined, // string
      checked: undefined, // boolean
    };

    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("checkbox-container");

    this.input = document.createElement("input");
    this.input.classList.add("input");
    this.input.type = "checkbox";
    this.input.addEventListener("change", this.handleOnChange);
    this.container.appendChild(this.input);

    this.update({ id, name, label, checked });
  }

  get checked() {
    return this.input.checked;
  }

  set checked(value) {
    this.input.checked = value;
    this.state.checked = value;
  }

  update({ id, name, label, checked }) {
    if (id !== undefined) this.state.id = id;
    if (name !== undefined) this.state.name = name;
    if (label !== undefined) this.state.label = label;
    if (checked !== undefined) this.state.checked = checked;
  }

  handleOnChange(e) {
    if (this.onChange) this.onChange(e);
  }

  fireEvent() {
    this.input.dispatchEvent(new Event("change"));
  }

  render() {
    this.input.id = this.state.id;
    this.input.name = this.state.name;
    this.input.checked = this.state.checked;

    if (this.state.label) {
      const label = document.createElement("label");
      label.classList.add("label");
      label.htmlFor = this.state.id;
      label.textContent = this.state.label;
      this.container.appendChild(label);
    }

    return this.container;
  }
}
