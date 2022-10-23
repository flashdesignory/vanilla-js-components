// import sheet from './input-form.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
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
    this.id = id;
    this.placeholder = placeholder;
    this.value = value;
    this.submitText = submitText;
    this.onSubmit = onSubmit;

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(e) {
    console.log("value", e.target.elements.input.value);

    if (this.onSubmit) this.onSubmit(e);
    e.preventDefault();
    e.target.reset();
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("input-form-container");

    const form = document.createElement("form");
    form.id = this.id;
    container.appendChild(form);

    const textInput = new Input({
      id: "input",
      type: "text",
      placeholder: this.placeholder,
      value: this.value,
      // onInput: (e) => console.log(e.target.value)
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
