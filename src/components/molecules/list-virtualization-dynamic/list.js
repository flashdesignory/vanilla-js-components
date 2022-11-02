// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { throttle } from "../../../lib/index.js";
import { DisplayCard } from "../../atoms/display-card/display-card.js";

const getIndex = (items, scrollTop) => {
  let min = 0;
  let max = items.length - 1;
  let middle;

  while (min <= max) {
    middle = Math.floor((min + max) / 2);

    if (middle === max && items[middle].y <= scrollTop) return middle;

    if (items[middle].y <= scrollTop && items[middle + 1].y > scrollTop) {
      return middle;
    }

    if (items[middle].y < scrollTop && items[middle + 1].y <= scrollTop) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
};

export class DynamicList {
  constructor({ data, displayHeight, displayWidth }) {
    this.data = data;
    this.displayHeight = displayHeight;
    this.displayWidth = displayWidth;

    this.amountRowsBuffered = 2;
    this.items = [];
    this.positions = [];
    this.scrollTop = 0;

    this.totalHeight = 0;

    this.container = document.createElement("div");
    this.container.classList.add("dynamic-list");
    this.container.style.height = `${this.displayHeight}px`;
    this.container.style.maxWidth = `${this.displayWidth}px`;

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.updateElements = this.updateElements.bind(this);

    const throttled = throttle(this.handleOnScroll, 50);
    this.container.addEventListener("scroll", throttled);

    this.populatePositions();
    this.updateElements();
  }

  handleOnScroll(e) {
    this.updateElements(e);
    this.render();
  }

  updateElements(e) {
    this.scrollTop = e ? e.target.scrollTop : this.scrollTop;

    const startIndex = Math.max(
      getIndex(this.positions, this.scrollTop) - this.amountRowsBuffered,
      0
    );

    const endIndex = Math.min(
      getIndex(this.positions, this.scrollTop + this.displayHeight) +
        this.amountRowsBuffered,
      this.data.length - 1
    );

    this.items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const data = this.data[i];
      const position = this.positions[i];
      const props = { ...data, y: position.y, height: position.height };
      this.items.push(new DisplayCard(props));
    }
  }

  populatePositions() {
    this.data.forEach((item) => {
      const position = {
        y: this.totalHeight,
        height: item.type === "text" ? 130 : 268,
      };
      this.totalHeight += position.height;
      this.positions.push(position);
    });
  }

  render() {
    if (this.content) this.container.removeChild(this.content);

    this.content = document.createElement("div");
    this.content.classList.add("list-content");
    this.content.style.height = `${this.totalHeight}px`;
    this.items.forEach((item) => {
      this.content.appendChild(item.render());
    });

    this.container.appendChild(this.content);
    return this.container;
  }
}
