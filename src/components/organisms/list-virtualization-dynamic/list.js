// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { throttle } from "../../../lib/index.js";
import { DisplayCard } from "../../molecules/display-card/display-card.js";

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
  constructor({ data, displayHeight, displayWidth, amountRowsBuffered }) {
    this.state = { data: [] };

    this.items = {};
    this.positions = [];
    this.scrollTop = 0;

    this.totalHeight = 0;

    this.container = document.createElement("div");
    this.container.classList.add("dynamic-list");
    this.container.tabIndex = 0;

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.rebuild = this.rebuild.bind(this);

    const throttled = throttle(this.handleOnScroll, 50);
    this.container.addEventListener("scroll", throttled);

    this.update({ data, displayHeight, displayWidth, amountRowsBuffered });
    // display initial list items
    if (data && data.length > 0) {
      this.populatePositions();
      this.rebuild();
    }
  }

  update({ data, displayHeight, displayWidth, amountRowsBuffered }) {
    if (data !== undefined) {
      this.state.data = [...this.state.data, ...data];
    }

    if (displayHeight !== undefined) this.state.displayHeight = displayHeight;
    if (displayWidth !== undefined) this.state.displayWidth = displayWidth;
    if (amountRowsBuffered !== undefined)
      this.state.amountRowsBuffered = amountRowsBuffered;
  }

  populatePositions() {
    this.state.data.forEach((item) => {
      const position = {
        y: this.totalHeight,
        height: item.type === "text" ? 130 : 268,
      };
      this.totalHeight += position.height;
      this.positions.push(position);
    });
  }

  rebuild(e) {
    this.scrollTop = e ? e.target.scrollTop : this.scrollTop;

    const startIndex = Math.max(
      getIndex(this.positions, this.scrollTop) - this.state.amountRowsBuffered,
      0
    );

    const endIndex = Math.min(
      getIndex(this.positions, this.scrollTop + this.state.displayHeight) +
        this.state.amountRowsBuffered,
      this.state.data.length - 1
    );

    let prev = { ...this.items };
    this.items = {};

    for (let i = startIndex; i <= endIndex; i++) {
      const data = this.state.data[i];
      const position = this.positions[i];
      const props = { ...data, y: position.y, height: position.height };
      const current = prev[props.id];
      if (current !== undefined) {
        current.update(props);
        this.items[props.id] = current;
      } else {
        this.items[props.id] = new DisplayCard(props);
      }
    }
  }

  handleOnScroll(e) {
    this.rebuild(e);
    this.render();
  }

  render() {
    this.container.style.height = `${this.state.displayHeight}px`;
    this.container.style.maxWidth = `${this.state.displayWidth}px`;

    this.container.replaceChildren();

    this.content = document.createElement("div");
    this.content.classList.add("list-content");
    this.content.style.height = `${this.totalHeight}px`;
    Object.values(this.items).forEach((item) => {
      this.content.appendChild(item.render());
    });

    this.container.appendChild(this.content);
    return this.container;
  }
}
