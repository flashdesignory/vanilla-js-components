// import sheet from './input-form.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input-form.css";

import { Input } from "../../atoms/input/input.js";

export class InputForm {
  constructor({
    id = "form",
    placeholder = "Enter Something",
    value,
    submitText = "Submit!",
    onSubmit,
  }) {
    this.onSubmit = onSubmit;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.update({ id, placeholder, value, submitText });
  }

  update({ id, placeholder, value, submitText }) {
    this.id = id;
    this.placeholder = placeholder;
    this.value = value;
    this.submitText = submitText;
  }

  handleOnSubmit(e) {
    console.log("value", e.target.elements.input.value);

    if (this.onSubmit) this.onSubmit(e);
    e.preventDefault();
    e.target.reset();
  }

  handleOnInput(e) {
    console.log("input", e.target.value);
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("input-form-container");

    const content = document.createElement("div");
    content.classList.add("input-form-content");
    container.appendChild(content);

    const form = document.createElement("form");
    form.id = this.id;
    content.appendChild(form);

    const textInput = new Input({
      id: "input",
      type: "text",
      placeholder: this.placeholder,
      value: this.value,
      onInput: this.handleOnInput,
    });
    form.appendChild(textInput.render());

    const submitInput = new Input({
      id: "submit",
      type: "submit",
      value: this.submitText,
    });
    form.appendChild(submitInput.render());

    form.addEventListener("submit", this.handleOnSubmit);

    return container;
  }
}
