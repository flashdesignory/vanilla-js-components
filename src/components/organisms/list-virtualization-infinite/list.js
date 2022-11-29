// import sheet from './list.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list.css";

import { throttle } from "../../../lib/index.js";
import { DisplayCard } from "../../molecules/display-card/display-card.js";

export class InfiniteList {
  constructor({
    data,
    visibleItems,
    itemHeight,
    itemWidth,
    amountRowsBuffered,
    onLastItem,
  }) {
    this.state = {
      data: [], // {id: string, text: string, metadata: string, avatar: string }[]
      visibleItems: undefined, // number
      itemHeight: undefined, // number
      itemWidth: undefined, // number
      amountRowsBuffered: undefined, // number
    };

    // keep track of props within the class
    this.onLastItem = onLastItem;
    // initial values
    this.items = {};
    this.scrollTop = 0;
    this.isFetching = false;
    // intersection observer
    this.lastListElement = undefined;
    this.observerConfig = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    this.handleOnObserve = this.handleOnObserve.bind(this);
    this.observer = new IntersectionObserver(
      this.handleOnObserve,
      this.observerConfig
    );
    // set initial elements
    this.container = document.createElement("div");
    this.container.classList.add("infinite-list");
    this.container.tabIndex = 0;

    this.content = document.createElement("div");
    this.content.classList.add("list-content");
    this.container.appendChild(this.content);
    // bind functions
    this.handleOnScroll = this.handleOnScroll.bind(this);
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

    this.isFetching = false;
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

  handleOnObserve(entries, observer) {
    if (this.lastListElement === undefined) return;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === this.lastListElement.id) {
        console.log(this.lastListElement?.id, this.isFetching);
        observer.unobserve(entry.target);
        this.lastListElement = undefined;
        this.isFetching = true;
        this.onLastItem();
        return;
      }
    });
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

    if (this.lastListElement) {
      this.observer.unobserve(this.lastListElement);
      this.lastListElement = undefined;
    }

    Object.values(this.items).forEach((item) => {
      const itemElement = item.render();

      if (itemElement) {
        this.content.appendChild(itemElement);
        if (
          item.state.id === this.state.data[this.state.data.length - 1].id &&
          !this.isFetching
        ) {
          this.lastListElement = itemElement;
          this.observer.observe(this.lastListElement);
        }
      }
    });

    return this.container;
  }
}
