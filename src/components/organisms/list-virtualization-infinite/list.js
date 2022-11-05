// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { throttle } from "../../../lib/index.js";
import { DisplayCard } from "../../molecules/display-card/display-card.js"

export class InfiniteList {
  constructor({
    data = [],
    visibleItems,
    itemHeight,
    itemWidth,
    amountRowsBuffered,
    onLastItem,
  }) {
    // keep track of props within the class
    this.visibleItems = visibleItems;
    this.itemHeight = itemHeight;
    this.itemWidth = itemWidth;
    this.amountRowsBuffered = amountRowsBuffered;
    this.onLastItem = onLastItem;
    // derrived values needed for calculations
    this.visibleWindowHeight = visibleItems * itemHeight;
    // initial values
    this.items = {};
    this.data = [];
    this.scrollTop = 0;
    // intersection observer
    this.lastListElement = null;
    this.observerConfig = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    this.handleOnObserve = this.handleOnObserve.bind(this);
    this.oberver = new IntersectionObserver(
      this.handleOnObserve,
      this.observerConfig
    );
    // set initial elements
    this.container = document.createElement("div");
    this.container.classList.add("infinite-list");
    this.container.style.height = `${this.visibleWindowHeight}px`;
    this.container.style.maxWidth = `${this.itemWidth}px`;

    this.content = document.createElement("div");
    this.content.classList.add("list-content");
    this.container.appendChild(this.content);
    // bind functions
    this.handleOnScroll = this.handleOnScroll.bind(this);
    // throttle scroll;
    const throttled = throttle(this.handleOnScroll, 50);
    this.container.addEventListener("scroll", throttled);
    // display initial list items
    if (data && data.length > 0) {
      this.updateData(data);
      this.updateElements();
    }
  }

  handleOnObserve(entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target === this.lastListElement) {
        this.onLastItem();
        observer.unobserve(entry.target);
        this.lastListElement = null;
      }
    });
  }

  handleOnScroll(e) {
    this.updateElements(e);
    this.render();
  }

  updateData(newData) {
    this.data = [...this.data, ...newData.items];
    this.totalHeight = this.data.length * this.itemHeight;
  }

  updateElements(e) {
    this.scrollTop = e ? e.target.scrollTop : this.scrollTop;

    const startIndex = Math.max(
      Math.floor(this.scrollTop / this.itemHeight) - this.amountRowsBuffered,
      0
    );

    const endIndex = Math.min(
      Math.ceil((this.scrollTop + this.visibleWindowHeight) / this.itemHeight) -
        1 +
        this.amountRowsBuffered,
      this.data.length - 1
    );

    let prev = { ...this.items };
    this.items = {};

    for (let i = startIndex; i <= endIndex; i++) {
      const item = this.data[i];
      const props = { ...item, index: i, height: this.itemHeight };
      const current = prev[props.id];
      if (current !== undefined) {
        current.update(props);
        this.items[props.id] = current;
      } else {
        this.items[props.id] = new DisplayCard(props);
      }
    }
  }

  render() {
    this.content.replaceChildren();
    this.content.style.height = `${this.totalHeight}px`;

    if (this.lastListElement) this.oberver.unobserve(this.lastListElement);

    Object.values(this.items).forEach((item) => {
      const itemElement = item.render();

      if (itemElement) {
        this.content.appendChild(itemElement);
        if (item.id === this.data[this.data.length - 1].id) {
          this.lastListElement = itemElement;
          this.oberver.observe(this.lastListElement);
        }
      }
    });

    return this.container;
  }
}
