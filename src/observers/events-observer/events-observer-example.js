// import sheet from './events-observer-example.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./events-observer-example.css";

import { DragAndDrop } from "../../components/organisms/drag-and-drop/drag-and-drop.js";
import { Draggable } from "../../components/organisms/drag-and-drop/draggable.js";
import { EventsObserver } from "./events-observer.js";

export class EventsObserverExample extends DragAndDrop {
  constructor({ title, description }) {
    super({ title, description });

    this.status = document.createElement("div");
    this.status.classList.add("drag-and-drop-status");
    this.container.appendChild(this.status);
    this.showMessage("idle");
  }

  build() {
    this.observers = [];
    for (let i = 0; i < 4; i++) {
      const box = new Draggable({
        containerClass: "drag-and-drop-box",
        id: `box-${i}`,
        onStart: this.handleOnStart,
        onEnd: this.handleOnEnd,
        onMove: this.handleOnMove,
      });
      this.toolbar.container.appendChild(box.render());
      box.container.textContent = i;
      this.boxes.push(box);
      const observer = new EventsObserver({
        ref: box.container,
        parent: this.droppable.container,
        events: [
          {
            type: "click",
            listener: (e) => this.showMessage(`onClick: ${e.target.id}`),
          },
        ],
        onConnect: (id) => this.showMessage(`onConnect: ${id}`),
        onDisconnect: (id) => this.showMessage(`onDisconnect: ${id}`),
      });
      this.observers.push(observer);
    }
  }

  showMessage(msg) {
    this.status.textContent = `${new Date().toLocaleTimeString()}: ${msg}`;
  }
}
