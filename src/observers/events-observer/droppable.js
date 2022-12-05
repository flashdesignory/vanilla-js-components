// import sheet from './draggable.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./draggable.css";

export class Droppable {
  constructor({ containerClass, id, onDrop, insertionPosition = "append" }) {
    this.onDrop = onDrop;
    this.insertionPosition = insertionPosition;

    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("droppable-container");

    if (containerClass !== undefined) {
      this.container.classList.add(containerClass);
    }

    this.container.id = id;

    this.container.addEventListener("dragover", this.handleOnDragOver);
    this.container.addEventListener("dragenter", this.handleOnDragEnter);
    this.container.addEventListener("dragleave", this.handleOnDragLeave);
    this.container.addEventListener("drop", this.handleOnDrop);
  }

  handleOnDragOver(e) {
    // console.log("over");
    e.preventDefault();
    return false;
  }

  handleOnDragEnter() {
    // console.log("enter");
    this.container.classList.add("over");
  }

  handleOnDragLeave() {
    // console.log("leave");
    this.container.classList.remove("over");
  }

  handleOnDrop(e) {
    e.stopPropagation();

    const id = e.dataTransfer.getData("text/plain");
    const element = document.getElementById(id);

    if (element?.parentElement === this.container) {
      // don't drop element in same container that it's in
      return false;
    }

    // append or prepend
    this.insertionPosition === "append"
      ? this.container.append(element)
      : this.container.prepend(element);

    if (this.onDrop) this.onDrop({ src: id, target: this.container.id });
    return false;
  }

  render() {
    return this.container;
  }
}
