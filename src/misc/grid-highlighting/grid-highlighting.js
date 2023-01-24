// import sheet from './grid-highlighting.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./grid-highlighting.css";

import { throttle } from "../../lib/index.js";

export class GridHighlighting {
  constructor() {
    this.rect = null;
    this.startX = 0;
    this.startY = 0;

    this.boxes = [];

    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnResize = this.handleOnResize.bind(this);
    const throttled = throttle(this.handleOnResize, 250);
    window.addEventListener("resize", throttled);

    this.container = document.createElement("div");
    this.container.classList.add("grid-highlighting-container");

    for (let i = 0; i < 200; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      this.container.appendChild(box);
      this.boxes.push(box);
    }

    this.waitForUserInteraction();
  }

  addRectangle() {
    this.rect = document.createElement("div");
    this.rect.classList.add("overlay");
    this.container.appendChild(this.rect);
  }

  removeRectangle() {
    this.startX = 0;
    this.startY = 0;
    this.container.removeChild(this.rect);
    this.rect = undefined;
  }

  draw(x, y) {
    if (x < this.startX) {
      this.rect.style.right = `${
        document.documentElement.clientWidth - this.startX
      }px`;
      this.rect.style.left = "auto";
      this.rect.style.width = `${this.startX - x}px`;
    } else {
      this.rect.style.left = `${this.startX}px`;
      this.rect.style.right = "auto";
      this.rect.style.width = `${x - this.startX}px`;
    }

    if (y < this.startY) {
      this.rect.style.bottom = `${
        window.innerHeight - this.startY - window.scrollY
      }px`;
      this.rect.style.top = "auto";
      this.rect.style.height = `${this.startY - y}px`;
    } else {
      this.rect.style.top = `${this.startY + window.scrollY}px`;
      this.rect.style.bottom = "auto";
      this.rect.style.height = `${y - this.startY}px`;
    }
  }

  evaluate() {
    this.boxes.forEach((box) => {
      const current = box.getBoundingClientRect();
      const overlay = this.rect.getBoundingClientRect();
      if (
        current.right >= overlay.left &&
        current.left <= overlay.right &&
        current.bottom >= overlay.top &&
        current.top <= overlay.bottom
      ) {
        box.classList.add("selected");
      } else {
        box.classList.remove("selected");
      }
    });
  }

  handleOnMouseDown(e) {
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startY = e.touches ? e.touches[0].clientY : e.clientY;

    this.addRectangle();
    this.captureUserInteraction();
  }

  handleOnMouseMove(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    this.draw(x, y);
    this.evaluate();
  }

  handleOnMouseUp() {
    this.removeRectangle();
    this.waitForUserInteraction();
  }

  handleOnResize() {
    this.boxes.forEach((box) => box.classList.remove("selected"));
  }

  waitForUserInteraction() {
    document.addEventListener("mousedown", this.handleOnMouseDown);
    document.addEventListener("touchstart", this.handleOnMouseDown);

    document.removeEventListener("mousemove", this.handleOnMouseMove);
    document.removeEventListener("touchmove", this.handleOnMouseMove);
    document.removeEventListener("mouseup", this.handleOnMouseUp);
    document.removeEventListener("touchend", this.handleOnMouseUp);
  }

  captureUserInteraction() {
    document.removeEventListener("mousedown", this.handleOnMouseDown);
    document.removeEventListener("touchstart", this.handleOnMouseDown);

    document.addEventListener("mousemove", this.handleOnMouseMove);
    document.addEventListener("touchmove", this.handleOnMouseMove);
    document.addEventListener("mouseup", this.handleOnMouseUp);
    document.addEventListener("touchend", this.handleOnMouseUp);
  }

  render() {
    return this.container;
  }
}
