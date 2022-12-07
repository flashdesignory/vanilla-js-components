// import sheet from './draggable.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./draggable.css";

import { DragAndDropIcon } from "../../../assets/drag-and-drop.js";

export class Droppable {
  constructor({ containerClass, id, onDrop, insertionPosition = "append", showIcon = false }) {
    this.onDrop = onDrop;
    this.insertionPosition = insertionPosition;
    this.showIcon = showIcon;

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

    if (this.showIcon) {
      this.placeholder = document.createElement("div");
      this.placeholder.classList.add("droppable-container-placeholder");
      this.placeholder.insertAdjacentHTML("afterbegin", DragAndDropIcon());
      this.container.appendChild(this.placeholder);
    }
  }

  handleOnDragOver(e) {
    e.preventDefault();
    return false;
  }

  handleOnDragEnter() {
    this.container.classList.add("over");
  }

  handleOnDragLeave() {
    this.container.classList.remove("over");
  }

  handleOnDrop(e) {
    e.stopPropagation();

    const id = e.dataTransfer.getData("text/plain");
    this.drop(id);
    return false;
  }

  drop(id) {
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
  }

  render() {
    return this.container;
  }
}
