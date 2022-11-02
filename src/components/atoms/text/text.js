// import sheet from './text.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./text.css";

export class Text {
  constructor({ content, containerClass, truncate }) {
    this.content = content;
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
  }

  render() {
    this.container.textContent = this.content;
    return this.container;
  }
}
