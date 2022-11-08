// import sheet from './input.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input.css";

export class Input {
  constructor({ id, type, placeholder, value, onInput, label, hideLabel }) {
    this.state = {};
    this.type = type;
    this.onInput = onInput;
    this.handleOnInput = this.handleOnInput.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("input-container");

    this.label = document.createElement("label");
    this.label.classList.add("label");
    this.container.appendChild(this.label);

    this.input = document.createElement("input");
    this.input.classList.add("input");
    this.input.type = this.type;
    this.input.addEventListener("input", this.handleOnInput);
    this.container.appendChild(this.input);

    this.update({ id, placeholder, value, label, hideLabel });
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.state.value = value;
  }

  update({ id, placeholder, value, label, hideLabel }) {
    if (id !== undefined) this.state.id = id;
    if (placeholder !== undefined) this.state.placeholder = placeholder;
    if (value !== undefined) this.state.value = value;
    if (label !== undefined) this.state.label = label;
    if (hideLabel !== undefined) this.state.hideLabel = hideLabel;
  }

  handleOnInput(e) {
    if (this.onInput) this.onInput(e);
  }

  render() {
    if (this.state.id) {
      this.input.id = this.state.id;
      this.label.htmlFor = this.state.id;
    }

    if (this.state.placeholder) this.input.placeholder = this.state.placeholder;

    if (this.state.hideLabel || !this.state.label)
      this.label.classList.add("visually-hidden");

    if (this.state.value) this.input.value = this.state.value;

    // label should always have a value
    // if it's not set with this.state.label, label will be hidden
    this.label.textContent = this.state.label ?? this.state.placeholder ?? "Enter a value";

    return this.container;
  }
}
