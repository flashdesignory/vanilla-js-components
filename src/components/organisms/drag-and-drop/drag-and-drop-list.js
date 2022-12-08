// import sheet from './drag-and-drop-list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./drag-and-drop-list.css";

import { List } from "../../atoms/list/list.js";
import { Draggable } from "./draggable.js";
import { Droppable } from "./droppable.js";

export class DragAndDropList extends List {
  constructor({
    data,
    insertionMethod,
    onClick,
    emptyListText,
    ItemClass,
    title,
    role = "list",
    containerClass,
  }) {
    super({
      data,
      insertionMethod,
      onClick,
      emptyListText,
      ItemClass,
      title,
      role,
      containerClass,
    });

    this.renderItem = this.renderItem.bind(this);

    // touch events
    this.handleOnStart = this.handleOnStart.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnMove = this.handleOnMove.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.touchClone = undefined;

    this.droppable = new Droppable({
      id: "droppable-list",
      ref: this.list,
      allowSelfDrop: true,
      insertionMethod: "ordered",
    });
  }

  rebuild() {
    if (this.state.ItemClass !== undefined) {
      this.list.setAttribute("aria-busy", "true");
    }

    this.items = [];
    this.state.data.forEach((item, index) => {
      const element = new Draggable({
        containerClass: "list-li",
        id: `draggable-item-${index}`,
        onStart: (e) => this.handleOnStart(e),
        onEnd: (e) => this.handleOnEnd(e),
        onMove: (e) => this.handleOnMove(e),
        ref: this.renderItem(item),
      });

      this.items.push(element);
    });
  }

  renderItem(item) {
    const element = document.createElement("li");
    element.classList.add("item-content");
    element.role = this.state.role === "listbox" ? "option" : "listitem";
    element.textContent = `${item}`;
    return element;
  }

  handleOnStart(e) {
    this.touchX = e.touches ? e.touches[0].pageX : e.pageX;
    this.touchY = e.touches ? e.touches[0].pageY : e.pageY;

    this.touchClone = e.target.cloneNode(true);
    this.touchClone.classList.add("over", "absolute");
    this.touchClone.style.top = `${this.touchY - 20 + window.scrollY}px`;
    this.touchClone.style.left = `${this.touchX - 20}px`;
    this.touchClone.style.transform = `translate(-50%, -50%)`;
    this.container.appendChild(this.touchClone);
  }

  handleOnMove(e) {
    this.touchX = e.touches ? e.touches[0].pageX : e.pageX;
    this.touchY = e.touches ? e.touches[0].pageY : e.pageY;

    this.touchClone.style.top = `${this.touchY - 20 + window.scrollY}px`;
    this.touchClone.style.left = `${this.touchX - 20}px`;
    this.touchClone.style.transform = `translate(-50%, -50%)`;
  }

  handleOnEnd(e) {
    this.container.removeChild(this.touchClone);
    this.evaluate(e.target);
    this.touchX = undefined;
    this.touchY = undefined;
    this.touchClone = undefined;
  }

  evaluate(target) {
    const droppableArea = this.droppable.container.getBoundingClientRect();
    if (
      this.touchX >= droppableArea.left &&
      this.touchX <= droppableArea.right &&
      this.touchY >= droppableArea.top &&
      this.touchY <= droppableArea.bottom
    ) {
      this.droppable.drop(target.id, this.touchX, this.touchY);
    }
  }
}
