// import sheet from './carousel.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./carousel.css";

import { DisplayImage } from "../../molecules/display-image/display-image.js";

export class Carousel {
  constructor({ data = [], itemHeight, itemWidth }) {
    this.state = {
      data: [], // {src: string }[]
      itemHeight: undefined, // number
      itemWidth: undefined, // number
    };

    // initial values
    this.items = {};

    this.container = document.createElement("div");
    this.container.classList.add("carousel-container");
    this.container.tabIndex = 0;

    this.content = document.createElement("div");
    this.content.classList.add("carousel-content");
    this.container.appendChild(this.content);

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

  render() {
    this.content.replaceChildren();
    this.content.style.height = `${this.state.itemHeight}px`;
    this.content.style.width = `${this.totalWidth}px`;
    Object.values(this.items).forEach((item) => {
      this.content.appendChild(item.render());
    });
    return this.container;
  }
}
