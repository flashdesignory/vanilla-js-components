// import sheet from './loader.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./loader.css";

export class Loader {
  constructor({ size = 120 }) {
    this.state = {};

    this.container = document.createElement("div");
    this.container.classList.add("loader-container");

    this.update({ size });
  }

  update({ size }) {
    this.state.size = size;
  }

  render() {
    this.container.style.width = `${this.state.size}px`;
    this.container.style.height = `${this.state.size}px`;
    this.container.style.borderWidth = `${this.state.size / 10}px`;
    return this.container;
  }
}
