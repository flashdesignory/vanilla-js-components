// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { DisplayCard } from "../../molecules/display-card/display-card.js";
import { throttle } from "../../../lib/index.js";

export class VirtualList {
  constructor({
    data = [],
    visibleItems,
    itemHeight,
    itemWidth,
    amountRowsBuffered,
  }) {
    this.state = {
      data: [], // {id: string, text: string, metadata: string, avatar: string }[]
      visibleItems: undefined, // number
      itemHeight: undefined, // number
      itemWidth: undefined, // number
      amountRowsBuffered: undefined, // number
    };

    // initial values
    this.items = {};
    this.scrollTop = 0;
    // set initial elements
    this.container = document.createElement("div");
    this.container.classList.add("virtual-list");
    this.container.tabIndex = 0;

    this.content = document.createElement("div");
    this.content.classList.add("list-content");
    this.content.style.height = `${this.totalHeight}px`;
    this.container.appendChild(this.content);
    // bind functions
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.rebuild = this.rebuild.bind(this);
    // throttle scroll;
    const throttled = throttle(this.handleOnScroll, 50);
    this.container.addEventListener("scroll", throttled);
    // display initial list items
    this.update({
      data,
      visibleItems,
      itemHeight,
      itemWidth,
      amountRowsBuffered,
    });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data, visibleItems, itemHeight, itemWidth, amountRowsBuffered }) {
    if (visibleItems !== undefined) this.state.visibleItems = visibleItems;
    if (itemHeight !== undefined) this.state.itemHeight = itemHeight;
    if (itemWidth !== undefined) this.state.itemWidth = itemWidth;
    if (amountRowsBuffered !== undefined)
      this.state.amountRowsBuffered = amountRowsBuffered;

    if (data !== undefined) {
      this.state.data = [...this.state.data, ...data];
      this.totalHeight = this.state.data.length * this.state.itemHeight;
    }

    // derrived values needed for calculations
    this.visibleWindowHeight = this.state.visibleItems * this.state.itemHeight;
    this.numMaxItems =
      this.state.visibleItems + 2 * this.state.amountRowsBuffered;
  }

  rebuild(e) {
    this.scrollTop = e ? e.target.scrollTop : this.scrollTop;

    const startIndex = Math.max(
      Math.floor(this.scrollTop / this.state.itemHeight) -
        this.state.amountRowsBuffered,
      0
    );

    const endIndex = Math.min(
      Math.ceil(
        (this.scrollTop + this.visibleWindowHeight) / this.state.itemHeight
      ) -
        1 +
        this.state.amountRowsBuffered,
      this.state.data.length - 1
    );

    let prev = { ...this.items };
    this.items = {};

    for (let i = startIndex; i <= endIndex; i++) {
      const item = this.state.data[i];
      const props = { ...item, index: i, height: this.state.itemHeight };
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
    this.container.style.height = `${this.visibleWindowHeight}px`;
    this.container.style.maxWidth = `${this.state.itemWidth}px`;

    this.content.replaceChildren();
    this.content.style.height = `${this.totalHeight}px`;
    Object.values(this.items).forEach((item) => {
      this.content.appendChild(item.render());
    });
    return this.container;
  }
}
