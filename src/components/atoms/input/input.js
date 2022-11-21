// import sheet from './input.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./input.css";

import { Button } from "../button/button.js";
import { EyeToggle } from "../../../assets/eye-toggle.js";

export class Input {
  constructor({
    id,
    type,
    placeholder,
    value,
    onInput,
    onFocus,
    onBlur,
    onClick,
    label,
    hideLabel,
    shouldFocus,
  }) {
    this.state = {
      id: undefined, // string
      placeholder: undefined, // string
      value: undefined, // unknown
      label: undefined, // string
      hideLabel: undefined, // boolean
      shouldFocus: undefined, // boolean
    };

    this.type = type;
    this.onInput = onInput;
    this.onFocus = onFocus;
    this.onBlur = onBlur;
    this.onClick = onClick;
    this.passwordIsVisible = false;

    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("input-container");

    this.label = document.createElement("label");
    this.label.classList.add("label");
    this.container.appendChild(this.label);

    this.input = document.createElement("input");
    this.input.classList.add("input");
    this.input.classList.add(`input-type-${this.type}`);
    this.input.type =
      this.type === "password" && this.passwordIsVisible ? "text" : this.type;
    this.input.autocomplete = "off";
    this.input.addEventListener("input", this.handleOnInput);
    this.input.addEventListener("focus", this.handleOnFocus);
    this.input.addEventListener("blur", this.handleOnBlur);
    this.input.addEventListener("click", this.handleOnClick);
    this.container.appendChild(this.input);

    if (this.type === "password") {
      this.toggle = new Button({
        type: "icon",
        onClick: this.handleToggleClick,
        containerClass: "toggle",
        label: EyeToggle({
          width: "24",
          height: "24",
          on: this.passwordIsVisible,
        }),
      });
      this.container.appendChild(this.toggle.render());
    }

    this.update({ id, placeholder, value, label, hideLabel, shouldFocus });
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.state.value = value;
  }

  update({ id, placeholder, value, label, hideLabel, shouldFocus }) {
    if (id !== undefined) this.state.id = id;
    if (placeholder !== undefined) this.state.placeholder = placeholder;
    if (value !== undefined) this.state.value = value;
    if (label !== undefined) this.state.label = label;
    if (hideLabel !== undefined) this.state.hideLabel = hideLabel;
    if (shouldFocus !== undefined) this.state.shouldFocus = shouldFocus;
  }

  handleOnInput(e) {
    if (this.onInput) this.onInput(e);
  }

  handleOnClick(e) {
    if (this.onClick) this.onClick(e);
  }

  handleOnFocus(e) {
    if (this.onFocus) this.onFocus(e);
  }

  handleOnBlur(e) {
    if (this.onBlur) this.onBlur(e);
  }

  handleToggleClick() {
    this.passwordIsVisible = !this.passwordIsVisible;
    this.input.type =
      this.type === "password" && this.passwordIsVisible ? "text" : this.type;

    if (this.toggle) {
      this.toggle.update({
        label: EyeToggle({
          width: "24",
          height: "24",
          on: this.passwordIsVisible,
        }),
      });
      this.toggle.render();
    }
  }

  render() {
    if (this.state.id) {
      this.input.id = this.state.id;
      this.label.htmlFor = this.state.id;
    }

    if (this.state.placeholder) this.input.placeholder = this.state.placeholder;
    else if (this.type === "date") {
      this.state.placeholder = "MM/DD/YYYY"
    }

    if (this.state.hideLabel || !this.state.label)
      this.label.classList.add("visually-hidden");

    if (this.state.value) this.input.value = this.state.value;

    // label should always have a value
    // if it's not set with this.state.label, label will be hidden
    this.label.textContent =
      this.state.label ?? this.state.placeholder ?? "Enter a value";

    if (this.state.shouldFocus) {
      // need to add a delay for now
      setTimeout(() => this.input.focus(), 50);
    }

    return this.container;
  }
}
