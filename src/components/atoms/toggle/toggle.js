// import sheet from './toggle.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./toggle.css";

export class Toggle {
  constructor({ id, checked }) {
    this.state = {
      id: undefined, // string
      checked: undefined, // boolean
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("toggle-container");
    this.container.role = "checkbox";
    this.container.tabIndex = 0;
    this.container.addEventListener("keydown", this.handleOnKeyDown);

    this.label = document.createElement("label");
    this.label.classList.add("label");
    this.container.appendChild(this.label);

    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.tabIndex = -1;
    this.input.addEventListener("change", this.handleOnChange);
    this.label.appendChild(this.input);

    this.span = document.createElement("span");
    this.span.classList.add("switch");
    this.label.appendChild(this.span);

    this.status = document.createElement("div");
    this.status.classList.add("visually-hidden");
    this.label.appendChild(this.status);

    this.update({ checked, id });
  }

  get checked() {
    return this.input.checked;
  }

  set checked(value) {
    this.input.checked = value;
    this.state.checked = value;
  }

  update({ id, checked }) {
    if (id !== undefined) this.state.id = id;
    if (checked !== undefined) this.state.checked = checked;
  }

  handleOnKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTimeout(() => this.input.click(), 50);
    }
  }

  handleOnChange(e) {
    this.state.checked = e.target.checked;
    if (this.status) {
      this.status.textContent = `selected: ${this.state.checked}`;
    }
  }

  render() {
    this.label.htmlFor = this.state.id;
    this.input.id = this.state.id;
    this.input.checked = this.state.checked;
    this.status.textContent = `selected: ${this.state.checked}`;
    return this.container;
  }
}
