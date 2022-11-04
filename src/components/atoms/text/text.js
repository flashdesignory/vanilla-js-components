// import sheet from './text.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./text.css";

export class Text {
  constructor({ text, containerClass, truncate }) {
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
    this.text = text;
  }

  render() {
    this.container.textContent = this.text;
    return this.container;
  }
}
