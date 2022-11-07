// import sheet from './text.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./text.css";

export class Text {
  constructor({ text, containerClass, truncate }) {
    this.state = {};
    this.containerClass = containerClass;
    this.truncate = truncate;

    this.container = document.createElement("div");
    this.container.classList.add("text-container");
    if (this.truncate) {
      this.container.classList.add("truncate");
    }
    if (this.containerClass) {
      this.container.classList.add(this.containerClass);
    }

    this.update({ text });
  }

  update({ text }) {
    if (text !== undefined) this.state.text = text;
  }

  render() {
    this.container.textContent = this.state.text;
    return this.container;
  }
}
