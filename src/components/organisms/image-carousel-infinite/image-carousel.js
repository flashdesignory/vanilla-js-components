// import sheet from './image-carousel.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./image-carousel.css";

import { DisplayImage } from "../../molecules/display-image/display-image.js";
import { Button } from "../../atoms/button/button.js";
import { ArrowLeft } from "../../../assets/arrow-left.js";
import { ArrowRight } from "../../../assets/arrow-right.js";

export class ImageCarousel {
  constructor({ data = [], itemHeight, itemWidth }) {
    this.state = {
      data: [], // {src: string }[]
      itemHeight: undefined, // number
      itemWidth: undefined, // number
    };

    // initial values
    this.items = {};

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.update = this.update.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("dynamic-carousel-container");
    this.container.tabIndex = 0;

    this.content = document.createElement("div");
    this.content.classList.add("dynamic-carousel-content");
    this.container.appendChild(this.content);

    this.nextButton = new Button({
      type: "icon",
      label: ArrowRight({ width: "33", height: "33" }),
      onClick: this.handleNextClick,
      containerClass: "next-button",
    });
    this.prevButton = new Button({
      type: "icon",
      label: ArrowLeft({ width: "33", height: "33" }),
      onClick: this.handlePrevClick,
      containerClass: "prev-button",
    });
    this.container.appendChild(this.nextButton.render());
    this.container.appendChild(this.prevButton.render());

    this.update({ data, itemWidth, itemHeight });

    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data, itemWidth, itemHeight }) {
    if (itemHeight !== undefined) this.state.itemHeight = itemHeight;
    if (itemWidth !== undefined) this.state.itemWidth = itemWidth;
    if (data !== undefined) {
      this.state.data = [...this.state.data, ...data];
      this.totalWidth = this.state.data.length * this.state.itemWidth;
    }
  }

  rebuild() {
    this.items = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const item = this.state.data[i];
      const props = {
        ...item,
        index: i,
        width: this.state.itemWidth,
        height: this.state.itemHeight,
      };
      this.items.push(new DisplayImage(props));
    }
  }

  handleNextClick() {
    this.animate("next");
  }

  handlePrevClick() {
    this.animate("prev");
  }

  applyClasses(direction) {
    this.current.classList.add("current-slide", direction);
    this.prev.classList.add("prev-slide", direction);
    this.next.classList.add("next-slide", direction);
  }

  removeClasses() {
    const classesToRemove = [
      "prev-slide",
      "current-slide",
      "next-slide",
      "right-to-left",
      "left-to-right",
    ];
    this.prev.classList.remove(...classesToRemove);
    this.current.classList.remove(...classesToRemove);
    this.next.classList.remove(...classesToRemove);
  }

  animate(direction) {
    this.removeClasses();

    if (direction === "prev") {
      [this.prev, this.current, this.next] = [
        this.prev.previousElementSibling || this.content.lastElementChild,
        this.prev,
        this.current,
      ];
    } else {
      [this.prev, this.current, this.next] = [
        this.current,
        this.next,
        this.next.nextElementSibling || this.content.firstElementChild,
      ];
    }

    this.applyClasses(direction === "prev" ? "left-to-right" : "right-to-left");
  }

  render() {
    this.container.style.width = `${this.state.itemWidth}px`;
    this.container.style.height = `${this.state.itemHeight}px`;
    this.content.replaceChildren();
    this.content.style.height = `${this.state.itemHeight}px`;
    this.content.style.width = `${this.itemWidth}px`;
    Object.values(this.items).forEach((item) => {
      this.content.appendChild(item.render());
    });

    this.current =
      this.content.querySelector(".current-slide") ||
      this.content.firstElementChild;
    this.prev =
      this.current.previousElementSibling || this.content.lastElementChild;
    this.next =
      this.current.nextElementSibling || this.content.firstElementChild;
    this.applyClasses("right-to-left");

    return this.container;
  }
}
