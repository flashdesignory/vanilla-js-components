// import sheet from './justified-layout.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./justified-layout.css";

import { DisplayImage } from "../../components/molecules/display-image/display-image.js";
import { throttle } from "../../lib/index.js";

export class JustifiedLayout {
  constructor({ maxHeight, containerWidth, data = [], onLastItem }) {
    this.state = {
      maxHeight: undefined, // number
      containerWidth: undefined, // number
      data: [], // unknown[]
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

    this.items = [];

    this.handleOnResize = this.handleOnResize.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("justified-layout-container");

    this.content = document.createElement("div");
    this.content.classList.add("justified-layout-content");
    this.container.appendChild(this.content);

    const throttled = throttle(this.handleOnResize, 250);

    this.resizeObserver = new ResizeObserver(throttled);
    this.resizeObserver.observe(this.container);

    this.update({ maxHeight, containerWidth, data });

    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ maxHeight, containerWidth, data }) {
    if (maxHeight !== undefined) this.state.maxHeight = maxHeight;
    if (containerWidth !== undefined)
      this.state.containerWidth = containerWidth;
    if (data !== undefined) this.state.data = [...this.state.data, ...data];

    this.isFetching = false;
  }

  rebuild() {
    this.content.replaceChildren();
    this.items = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const props = {
        index: i,
        id: this.state.data[i].id,
        width: this.state.data[i].image.width,
        height: this.state.data[i].image.height,
        data: this.state.data[i].image,
      };
      const item = new DisplayImage(props);
      this.items.push(item);
      this.content.appendChild(item.render());
    }
  }

  resize() {
    let row = [];
    let currentWidth = 0;
    this.items.forEach((item, index) => {
      row.push(item);
      currentWidth += Math.ceil(
        (this.state.maxHeight / item.height) * item.width
      );
      if (
        currentWidth >= this.state.containerWidth ||
        index === this.items.length - 1
      ) {
        const height = Math.floor(
          (this.state.containerWidth / currentWidth) * this.state.maxHeight
        );
        row.forEach((image) => {
          const width = Math.floor((height / image.height) * image.width);
          image.update({ width, height });
        });
        row = [];
        currentWidth = 0;
      }
    });
  }

  handleOnResize(entries) {
    for (let entry of entries) {
      const cr = entry.contentRect;
      console.log(
        "handleOnResize",
        "containerWidth",
        this.state.containerWidth,
        "new",
        cr.width
      );
      if (this.state.containerWidth === cr.width) return;

      this.resizeObserver.disconnect();
      this.update({ containerWidth: cr.width });
      this.render();
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

    if (this.state.containerWidth === undefined) {
      return this.container;
    }

    console.log("render()");
    this.resize();
    this.items.forEach((item) => {
      const itemElement = item.render();

      if (
        item.state.id === this.state.data[this.state.data.length - 1].id &&
        !this.isFetching
      ) {
        this.lastListElement = itemElement;
        this.observer.observe(this.lastListElement);
      }
    });

    window.requestAnimationFrame(() =>
      this.resizeObserver.observe(this.container)
    );
    return this.container;
  }
}
