// import sheet from './select.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./select.css";

export class Select {
  constructor({ id, multiple, data, onChange }) {
    this.onChange = onChange;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.update({ id, multiple, data });
  }

  update({ id, multiple, data }) {
    this.id = id;
    this.multiple = multiple;
    this.data = data;
  }

  handleOnChange(e) {
    if (!this.onChange) return;

    if (this.multiple) {
      const selected = [...e.target.options].filter(
        (option) => option.selected
      );
      this.onChange(selected.map((selection) => selection.value));
    } else {
      this.onChange(e.target.value);
    }
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("select-container");

    const label = document.createElement("label");
    label.classList.add("visually-hidden");
    label.htmlFor = this.id;
    label.textContent = this.id;
    container.appendChild(label);

    const select = document.createElement("select");
    select.classList.add("select");
    select.id = this.id;
    select.multiple = this.multiple;

    this.data.forEach((item) => {
      const option = document.createElement("option");
      option.classList.add("option");
      option.value = item.value;
      option.textContent = item.text;
      select.appendChild(option);
    });

    select.addEventListener("change", this.handleOnChange);
    container.appendChild(select);

    return container;
  }
}
