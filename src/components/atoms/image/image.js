// import sheet from './image.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./image.css";

export class Image {
  constructor({ src, alt, width, height, animate = false }) {
    this.src = src;
    this.alt = alt;
    this.width = width;
    this.height = height;
    this.animate = animate;

    this.handleOnError = this.handleOnError.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnError(e) {
    console.log("error occured");
  }

  handleOnLoad(e) {
    console.log("image has loaded");
    if (this.animate) this.image.style.opacity = 1;
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("image-container");

    this.image = document.createElement("img");
    this.image.addEventListener("load", this.handleOnLoad);
    this.image.addEventListener("error", this.handleOnError);
    this.image.src = this.src;
    if (this.alt) this.image.alt = this.alt;
    if (this.width) this.image.width = this.width;
    if (this.height) this.image.height = this.height;
    if (this.animate) this.image.style.opacity = 0;
    container.appendChild(this.image);

    return container;
  }
}
