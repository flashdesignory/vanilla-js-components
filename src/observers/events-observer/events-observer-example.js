// import sheet from './events-observer-example.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./events-observer-example.css";

import { Text } from "../../components/atoms/text/text.js";
import { Draggable } from "./draggable.js";
import { Droppable } from "./droppable.js";
import { EventsObserver } from "./events-observer.js";

export class EventsObserverExample {
  constructor({ title, description }) {
    this.state = {
      title: undefined, // string
      description: undefined, // string
    };

    this.boxes = [];
    this.observers = [];
    // for mobile or touch devices
    this.touchX = undefined;
    this.touchY = undefined;
    this.touchBox = undefined;

    this.handleOnDrop = this.handleOnDrop.bind(this);

    // touch events
    this.handleOnStart = this.handleOnStart.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnMove = this.handleOnMove.bind(this);
    this.evaluate = this.evaluate.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("events-observer-example-container");

    this.top = document.createElement("div");
    this.top.classList.add("events-observer-example-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "events-observer-example-title" });
    this.top.appendChild(this.header.render());

    this.instructions = new Text({
      containerClass: "events-observer-example-description",
    });
    this.top.appendChild(this.instructions.render());

    this.body = document.createElement("div");
    this.body.classList.add("events-observer-example-body");
    this.container.appendChild(this.body);

    this.toolbar = new Droppable({
      containerClass: "events-observer-example-toolbar",
      id: "toolbar",
      onDrop: this.handleOnDrop,
    });
    this.body.appendChild(this.toolbar.render());

    this.droppable = new Droppable({
      containerClass: "events-observer-example-droppable",
      id: "body",
      onDrop: this.handleOnDrop,
    });
    this.body.appendChild(this.droppable.render());

    for (let i = 0; i < 4; i++) {
      const box = new Draggable({
        containerClass: "events-observer-example-box",
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

    this.status = document.createElement("div");
    this.status.classList.add("events-observer-example-status");
    this.container.appendChild(this.status);
    this.showMessage("idle");

    this.update({ title, description });
  }

  update({ title, description }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (title !== undefined) {
      this.state.description = description;
      this.instructions.update({ text: this.state.description });
    }
  }

  handleOnDrop(/* { src, target } */) {
    // console.log("src", src, "target", target);
  }

  handleOnStart(e) {
    this.touchX = e.touches ? e.touches[0].clientX : e.clientX;
    this.touchY = e.touches ? e.touches[0].clientY : e.clientY;
    this.touchBox = document.createElement("div");
    this.touchBox.classList.add("events-observer-example-box", "over", "absolute");
    this.touchBox.style.top = `${this.touchY - 20 + window.scrollY}px`;
    this.touchBox.style.left = `${this.touchX - 20}px`;
    this.container.appendChild(this.touchBox);
  }

  handleOnMove(e) {
    this.touchX = e.touches ? e.touches[0].clientX : e.clientX;
    this.touchY = e.touches ? e.touches[0].clientY : e.clientY;
    this.touchBox.style.top = `${this.touchY - 20 + window.scrollY}px`;
    this.touchBox.style.left = `${this.touchX - 20}px`;
  }

  handleOnEnd(e) {
    this.container.removeChild(this.touchBox);
    
    this.evaluate(e.target);
    this.touchX = undefined;
    this.touchY = undefined;
    this.touchBox = undefined;
  }

   evaluate(target) {
      const droppableArea = this.droppable.container.getBoundingClientRect();
      const toolbarArea = this.toolbar.container.getBoundingClientRect();
      if (
        this.touchX >= droppableArea.left &&
        this.touchX <= droppableArea.right &&
        this.touchY >= droppableArea.top &&
        this.touchY <= droppableArea.bottom
      ) {
        this.droppable.drop(target.id);
      } else if (
        this.touchX >= toolbarArea.left &&
        this.touchX <= toolbarArea.right &&
        this.touchY >= toolbarArea.top &&
        this.touchY <= toolbarArea.bottom 
      ){
        this.toolbar.drop(target.id);
      } 
  }

  showMessage(msg) {
    this.status.textContent = `status: ${msg}`;
  }

  render() {
    this.header.render();
    this.instructions.render();
    return this.container;
  }
}
