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
    this.state = {
      id: undefined, // string
      placeholder: undefined, // string
      value: undefined, // unknown
      submitText: undefined, // string
    };

    this.onSubmit = onSubmit;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("input-form-container");

    this.content = document.createElement("div");
    this.content.classList.add("input-form-content");
    this.container.appendChild(this.content);

    this.form = document.createElement("form");
    this.content.appendChild(this.form);

    this.textInput = new Input({
      id: "input",
      type: "text",
      onInput: this.handleOnInput,
    });
    this.form.appendChild(this.textInput.render());

    this.submitInput = new Input({
      id: "submit",
      type: "submit",
    });
    this.form.appendChild(this.submitInput.render());
    this.form.addEventListener("submit", this.handleOnSubmit);

    this.update({ id, placeholder, value, submitText });
  }

  update({ id, placeholder, value, submitText }) {
    if (id !== undefined) this.state.id = id;
    if (placeholder !== undefined) this.state.placeholder = placeholder;
    if (value !== undefined) this.state.value = value;
    if (submitText !== undefined) this.state.submitText = submitText;

    this.textInput.update({
      placeholder: this.state.placeholder,
      value: this.state.value,
    });

    this.submitInput.update({ value: this.state.submitText });
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
    this.form.id = this.state.id;

    this.textInput.render();
    this.submitInput.render();

    return this.container;
  }
}
