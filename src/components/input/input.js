// import sheet from './input.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
import "./input.css";

export class Input {
  constructor({ id, type, placeholder, onInput }) {
    this.id = id;
    this.type = type;
    this.placeholder = placeholder;
    this.onInput = onInput;

    this.handleOnInput = this.handleOnInput.bind(this);
  }

  handleOnInput(e) {
    this.onInput(e);
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("input-container");
    const input = document.createElement("input");
    input.classList.add("input");
    input.id = this.id;
    input.type = this.type;
    input.placeholder = this.placeholder;
    input.addEventListener("input", this.handleOnInput);
    container.appendChild(input);
    return container;
  }
}
