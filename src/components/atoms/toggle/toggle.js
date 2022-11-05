// import sheet from './toggle.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./toggle.css";

export class Toggle {
  constructor({ checked, id }) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update({ checked, id });
  }

  update({ id, checked }) {
    this.id = id;
    this.checked = checked;
  }

  handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setTimeout(() => this.input.click(), 50);
    }
  }

  handleChange(e) {
    this.checked = e.target.checked;
    if (this.status) {
      this.status.textContent = `selected: ${this.checked}`;
    }
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("toggle-container");
    container.role = "checkbox";
    container.tabIndex = 0;
    container.addEventListener("keydown", this.handleKeyDown);

    const label = document.createElement("label");
    label.classList.add("toggle-label");
    label.htmlFor = this.id;
    container.appendChild(label);

    this.input = document.createElement("input");
    this.input.id = this.id;
    this.input.type = "checkbox";
    this.input.checked = this.checked;
    this.input.tabIndex = -1;
    this.input.addEventListener("change", this.handleChange);
    label.appendChild(this.input);

    const span = document.createElement("span");
    span.classList.add("toggle-switch");
    label.appendChild(span);

    this.status = document.createElement("div");
    this.status.classList.add("visually-hidden");
    this.status.textContent = `selected: ${this.checked}`;
    label.appendChild(this.status);

    return container;
  }
}
