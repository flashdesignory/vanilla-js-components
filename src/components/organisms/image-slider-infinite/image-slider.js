// import sheet from './image-slider.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./image-slider.css";

import { DisplayImage } from "../../molecules/display-image/display-image.js";

export class ImageSlider {
  constructor({ data = [], itemHeight, itemWidth, onLastItem }) {
    this.state = {
      data: [], // {src: string }[]
      itemHeight: undefined, // number
      itemWidth: undefined, // number
    };

    this.onLastItem = onLastItem;
    this.isFetching = false;
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

    // initial values
    this.items = {};

    this.container = document.createElement("div");
    this.container.classList.add("lazydata-image-slider-container");
    this.container.tabIndex = 0;

    this.content = document.createElement("div");
    this.content.classList.add("lazydata-image-slider-content");
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

    this.isFetching = false;
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

  handleOnObserve(entries, observer) {
    if (this.lastListElement === undefined) return;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === this.lastListElement.id) {
        observer.unobserve(entry.target);
        this.lastListElement = undefined;
        this.isFetching = true;
        if (this.onLastItem) this.onLastItem();
        return;
      }
    });
  }

  render() {
    if (this.lastListElement) {
      this.observer.unobserve(this.lastListElement);
      this.lastListElement = undefined;
    }

    this.content.replaceChildren();
    this.content.style.height = `${this.state.itemHeight}px`;
    this.content.style.width = `${this.totalWidth}px`;
    Object.values(this.items).forEach((item) => {
      const itemElement = item.render();
      this.content.appendChild(itemElement);
      if (
        item.state.id === this.state.data[this.state.data.length - 1].id &&
        !this.isFetching
      ) {
        this.lastListElement = itemElement;
        this.observer.observe(this.lastListElement);
      }
    });
    return this.container;
  }
}
