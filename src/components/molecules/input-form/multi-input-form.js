// import sheet from './input-form.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input-form.css";

import { Input } from "../../atoms/input/input.js";

export class MultiInputForm {
  constructor({ id = "form", data, onSubmit, submitText }) {
    this.state = {
      id: undefined, // string
      submitText: undefined, // string
      data: [], // // {name: string, type: string, placeholder: string, value: string };
    };

    this.items = [];

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

    this.submitInput = new Input({
      id: "submit",
      type: "submit",
      label: "submit form",
      hideLabel: true,
    });
    this.form.appendChild(this.submitInput.render());
    this.form.addEventListener("submit", this.handleOnSubmit);

    this.update({ id, data, submitText });

    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ id, submitText, data }) {
    if (id !== undefined) this.state.id = id;

    if (submitText !== undefined) {
      this.state.submitText = submitText;
      this.submitInput.update({ value: this.state.submitText });
    }

    if (data !== undefined) {
      this.state.data = [...this.state.data, ...data];
    }
  }

  rebuild() {
    this.items = [];
    this.form.replaceChildren();
    this.state.data.forEach((item) => {
      const element = new Input({
        id: item.id,
        type: item.type,
        placeholder: item.placeholder,
        value: item.value,
        onInput: this.handleOnInput,
      });
      this.form.appendChild(element.render());
      this.items.push(element);
    });
    this.form.appendChild(this.submitInput.render());
  }

  handleOnSubmit(e) {
    Array.from(e.target.elements).forEach((element) =>
      console.log("submit", element.id, element.value)
    );
    if (this.onSubmit) this.onSubmit(e);
    e.preventDefault();
    e.target.reset();
  }

  handleOnInput(e) {
    console.log("input", e.target.value);
  }

  render() {
    this.form.id = this.state.id;

    this.items.forEach((item) => item.render());
    this.submitInput.render();

    return this.container;
  }
}
