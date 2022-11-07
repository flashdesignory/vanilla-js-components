// import sheet from './select.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./select.css";

export class Select {
  constructor({ id, multiple, data, onChange }) {
    this.state = {};
    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("select-container");

    this.label = document.createElement("label");
    this.label.classList.add("visually-hidden");
    this.container.appendChild(this.label);

    this.select = document.createElement("select");
    this.select.classList.add("select");

    this.select.addEventListener("change", this.handleOnChange);
    this.container.appendChild(this.select);

    this.update({ id, multiple, data });
  }

  update({ id, multiple, data }) {
    if (id !== undefined) this.state.id = id;
    if (multiple !== undefined) this.state.multiple = multiple;
    if (data !== undefined) this.state.data = data;
  }

  handleOnChange(e) {
    if (!this.onChange) return;

    if (this.state.multiple) {
      const selected = [...e.target.options].filter(
        (option) => option.selected
      );
      this.onChange(selected.map((selection) => selection.value));
    } else {
      this.onChange(e.target.value);
    }
  }

  render() {
    this.label.htmlFor = this.state.id;
    this.label.textContent = this.state.id;

    this.select.id = this.state.id;
    this.select.multiple = this.state.multiple;

    this.state.data.forEach((item) => {
      const option = document.createElement("option");
      option.classList.add("option");
      option.value = item.value;
      option.textContent = item.text;
      this.select.appendChild(option);
    });

    return this.container;
  }
}
