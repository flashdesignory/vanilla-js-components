// import sheet from './draggable.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./draggable.css";

export class Draggable {
  constructor({ containerClass, id }) {
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("draggable-container");

    if (containerClass !== undefined) {
      this.container.classList.add(containerClass);
    }

    this.container.draggable = true;
    this.container.id = id;

    this.container.addEventListener("dragstart", this.handleOnDragStart);
    this.container.addEventListener("dragend", this.handleOnDragEnd);
  }

  handleOnDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.container.id);
  }

  handleOnDragEnd() {
    // console.log("end");
  }

  render() {
    return this.container;
  }
}
