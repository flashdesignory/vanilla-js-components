// import sheet from './button.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./button.css";

export class Button {
  constructor({ type, label, onClick }) {
    this.state = {};
    this.onClick = onClick;
    this.type = type; // "primary" | "secondary" | "icon"

    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("button-container");
    this.button = document.createElement("button");
    this.button.classList.add("button", `button-${this.type}`);

    this.button.addEventListener("click", this.handleOnClick);
    this.container.appendChild(this.button);

    this.update({ label });
  }

  update({ label }) {
    if (label !== undefined) this.state.label = label;
  }

  handleOnClick(e) {
    if (this.onClick) this.onClick(e);
  }

  render() {
    if (this.type !== "icon") this.button.textContent = this.state.label;
    else this.button.insertAdjacentHTML("afterbegin", this.state.label);

    return this.container;
  }
}

export const FunctionalButton = ({ type, text, onClick }) => {
  let label = text;
  const update = ({ text }) => {
    label = text;
  };
  const handleOnClick = (e) => {
    if (onClick) onClick(e);
  };
  const render = () => {
    const container = document.createElement("div");
    container.classList.add("button-container");
    const button = document.createElement("button");
    button.classList.add("button", `button-${type}`);
    button.textContent = label;
    button.addEventListener("click", handleOnClick);
    container.appendChild(button);
    return container;
  };
  return { render, update };
};
