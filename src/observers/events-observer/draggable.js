// import sheet from './draggable.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./draggable.css";

export class Draggable {
  constructor({ containerClass, id, onStart, onEnd }) {
    this.onStart = onStart;
    this.onEnd = onEnd;

    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);

    this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("draggable-container");

    if (containerClass !== undefined) {
      this.container.classList.add(containerClass);
    }

    this.container.draggable = true;
    this.container.id = id;

    this.container.addEventListener("dragstart", this.handleOnDragStart);
    this.container.addEventListener("dragend", this.handleOnDragEnd);

    this.container.addEventListener("touchstart", this.handleOnTouchStart);
    this.container.addEventListener("touchmove", this.handleOnTouchMove);
    this.container.addEventListener("touchend", this.handleOnTouchEnd);
  }

  handleOnDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.container.id);
    console.log('handleOnDragStart()');

    if (this.onStart) this.onStart("drag start");
  }

  handleOnDragEnd() {
    if (this.onEnd) this.onEnd("drag end");
    console.log("handleOnDragEnd()");
  }

  handleOnTouchStart() {
    if (this.onStart) this.onStart("touch start");
    console.log("handleOnTouchStart()");
  }

  handleOnTouchMove() {

  }

  handleOnTouchEnd() {
    if (this.onEnd) this.onEnd("touch end");
    console.log("handleOnTouchEnd()");
  }

  render() {
    return this.container;
  }
}
