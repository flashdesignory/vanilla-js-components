/* import sheet from "./business-card.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet); */
import "./business-card.css";

export class BusinessCard {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("business-card-container");
    this.container.textContent = "Hello World 👋";
  }

  render() {
    return this.container;
  }
}
