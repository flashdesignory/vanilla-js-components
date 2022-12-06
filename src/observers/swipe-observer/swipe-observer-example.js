// import sheet from './swipe-observer-example.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./swipe-observer-example.css";

import { Text } from "../../components/atoms/text/text.js";
import { SwipeObserver } from "./swipe-observer.js";

export class SwipeObserverExample {
  constructor({ title, description }) {
    this.state = {
      title: undefined, // string
      description: undefined, // string
    };

    this.container = document.createElement("div");
    this.container.classList.add("swipe-observer-container");

    this.top = document.createElement("div");
    this.top.classList.add("swipe-observer-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "swipe-observer-title" });
    this.top.appendChild(this.header.render());

    this.instructions = new Text({
      containerClass: "swipe-observer-description",
    });
    this.top.appendChild(this.instructions.render());

    this.body = document.createElement("div");
    this.body.classList.add("swipe-observer-body");
    this.container.appendChild(this.body);

    this.status = document.createElement("div");
    this.status.classList.add("swipe-observer-status");
    this.container.appendChild(this.status);
    this.showMessage("idle");

    this.handleOnSwipe = this.handleOnSwipe.bind(this);

    this.observer = new SwipeObserver({ ref: this.body });
    this.body.addEventListener("swipe-right", this.handleOnSwipe);
    this.body.addEventListener("swipe-left", this.handleOnSwipe);
    this.body.addEventListener("swipe-up", this.handleOnSwipe);
    this.body.addEventListener("swipe-down", this.handleOnSwipe);
    this.observer.observe();

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

  showMessage(msg) {
    this.status.textContent = `${new Date().toLocaleTimeString()}: ${msg}`;
  }

  handleOnSwipe(e) {
    this.showMessage(e.type)
  }

  render() {
    this.header.render();
    this.instructions.render();
    return this.container;
  }
}
