// import sheet from './justified-layout.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./justified-layout.css";

import { DisplayImage } from "../../components/molecules/display-image/display-image.js";
import { throttle } from "../../lib/index.js";

export class JustifiedLayout {
  constructor({ maxHeight, containerWidth, data = [] }) {
    this.state = {
      maxHeight: undefined, // number
      containerWidth: undefined, // number
      data: [], // unknown[]
    };

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
  }

  rebuild() {
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

  render() {
    if (this.state.containerWidth === undefined) {
      return this.container;
    }

    console.log("render()");
    this.resize();
    this.items.forEach((item) => item.render());

    window.requestAnimationFrame(() =>
      this.resizeObserver.observe(this.container)
    );
    return this.container;
  }
}
