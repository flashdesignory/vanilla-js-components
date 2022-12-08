// import sheet from './droppable.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./droppable.css";

import { DragAndDropIcon } from "../../../assets/drag-and-drop.js";

export class Droppable {
  constructor({
    containerClass,
    id,
    onDrop,
    insertionMethod = "append",
    showIcon = false,
    ref,
    allowSelfDrop = false,
  }) {
    this.onDrop = onDrop;
    // append | prepend | ordered
    this.insertionMethod = insertionMethod;
    this.showIcon = showIcon;
    this.ref = ref;
    this.allowSelfDrop = allowSelfDrop;

    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);

    if (this.ref !== undefined) {
      this.container = this.ref;
    } else {
      this.container = document.createElement("div");
      this.container.classList.add("droppable-container");
    }

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
      this.placeholder.classList.add("placeholder");
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
    this.drop(id, e.clientX, e.clientY);
    return false;
  }

  drop(id, x, y) {
    const element = document.getElementById(id);

    if (element?.parentElement === this.container && !this.allowSelfDrop) {
      // don't drop element in same container that it's in
      return false;
    }

    switch (this.insertionMethod) {
      case "append":
        this.container.append(element);
        break;
      case "prepend":
        this.container.prepend(element);
        break;
      default:
        this.insert(element, x, y);
        break;
    }

    if (this.onDrop) this.onDrop({ src: id, target: this.container.id });
  }

  insert(element, x, y) {
    let targetPosition;
    const target = Array.from(this.container.children).find((child) => {
      targetPosition = child.getBoundingClientRect();
      return y >= targetPosition.top && y <= targetPosition.bottom;
    });

    const startPosition = element.getBoundingClientRect();
    if (!target) return;
    if (startPosition.top <= targetPosition.top) {
      target.after(element);
    } else {
      target.before(element);
    }
  }

  render() {
    return this.container;
  }
}
