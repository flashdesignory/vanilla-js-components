// import sheet from './display-card.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./display-card.css";

export class DisplayCardBase {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("item-container");
  }

  render() {
    return this.container;
  }
}
