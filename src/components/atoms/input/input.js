// import sheet from './input.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input.css";

export class Input {
  constructor({ id, type, placeholder, value, onInput }) {
    this.type = type;
    this.onInput = onInput;
    this.handleOnInput = this.handleOnInput.bind(this);
    this.update({ id, placeholder, value });
  }

  update({ id, placeholder, value }) {
    this.id = id;
    this.placeholder = placeholder;
    this.value = value;
  }

  handleOnInput(e) {
    if (this.onInput) this.onInput(e);
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("input-container");
    const input = document.createElement("input");
    input.classList.add("input");
    input.id = this.id;
    input.type = this.type;
    input.placeholder = this.placeholder;
    if (this.value) input.value = this.value;
    input.addEventListener("input", this.handleOnInput);
    container.appendChild(input);
    return container;
  }
}
