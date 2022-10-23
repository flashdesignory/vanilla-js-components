// import sheet from './button.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
import "./button.css";

export class Button {
  constructor({ type, label, onClick }) {
    this.label = label;
    this.onClick = onClick;
    this.type = type;

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    if (this.onClick) this.onClick(e);
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("button-container");
    const button = document.createElement("button");
    button.classList.add("button", `button-${this.type}`);
    button.textContent = this.label;
    button.addEventListener("click", this.handleOnClick);
    container.appendChild(button);
    return container;
  }
}
