// import sheet from './display-image.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./display-image.css";

import { ImageIcon } from "../../../assets/image.js";
import { getAspectRatioForStyles } from "../../../lib/image.js";
import { Image } from "../../atoms/image/image.js";

export class DisplayImage {
  constructor(props) {
    this.state = {
      index: undefined, // number
      id: undefined, // string
      height: undefined, // number
      width: undefined, // number
      x: undefined, // number
      y: undefined, // number
      data: undefined, // Image
    };

    this.container = document.createElement("div");
    this.container.classList.add("display-image-container");

    this.content = document.createElement("div");
    this.content.classList.add("item-content");
    this.container.appendChild(this.content);

    this.placeholder = document.createElement("div");
    this.placeholder.classList.add("item-placeholder");
    this.placeholder.insertAdjacentHTML("afterbegin", ImageIcon());
    this.content.appendChild(this.placeholder);

    this.image = new Image({
      fadeIn: true,
      lazyLoad: true,
    });

    if (props) this.update(props);
  }

  get width() {
    return this.state.width;
  }

  get height() {
    return this.state.height;
  }

  update({ index, id, height, width, x, y, data }) {
    if (index !== undefined) this.state.index = index;
    if (height !== undefined) this.state.height = height;
    if (width !== undefined) this.state.width = width;
    if (y !== undefined) this.state.y = y;
    if (x !== undefined) this.state.x = x;
    if (id !== undefined) this.state.id = id;
    if (data !== undefined) this.state.data = data;
  }

  render() {
    this.container.id = `display-image-${this.state.id}`;
    this.container.style.maxWidth = `${this.state.width}px`;
    this.container.style.maxHeight = `${this.state.height}px`;
    this.container.style.aspectRatio = `${getAspectRatioForStyles(
      this.state.width,
      this.state.height
    )}`;

    if (this.state.x !== undefined || this.state.y !== undefined) {
      this.container.style.position = "absolute";
      this.container.style.transform = `translate(${this.state.x ?? 0}px, ${
        this.state.y ?? 0
      }px)`;
    }

    if (this.state.data !== undefined) {
      this.image.update({ ...this.state.data });
      if (this.content.contains(this.image.container)) return this.container;
      this.content.appendChild(this.image.render());
    }

    return this.container;
  }
}
