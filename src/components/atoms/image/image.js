// import sheet from './image.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./image.css";

export class Image {
  constructor({ src, alt, width, height, imageClass, containerClass, fadeIn = false }) {
    this.imageClass = imageClass;
    this.containerClass = containerClass;
    this.fadeIn = fadeIn;

    this.handleOnError = this.handleOnError.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("image-container");
    if (this.containerClass) {
      this.container.classList.add(this.containerClass);
    }

    this.image = document.createElement("img");
    if (this.imageClass) {
      this.image.classList.add(this.imageClass);
    }
    this.image.addEventListener("load", this.handleOnLoad);
    this.image.addEventListener("error", this.handleOnError);
    this.container.appendChild(this.image);

    this.update({src, alt, width, height});
  }

  handleOnError() {
    console.log("error occured");
  }

  handleOnLoad() {
    // console.log("image has loaded");
    if (this.fadeIn) this.image.style.opacity = 1;
  }

  update({ src, alt, width, height }) {
    this.src = src;
    this.alt = alt;
    this.width = width;
    this.height = height;
  }

  render() {
    this.image.src = this.src;
    if (this.alt) this.image.alt = this.alt;
    if (this.width) this.image.width = this.width;
    if (this.height) this.image.height = this.height;
    if (this.fadeIn) this.image.style.opacity = 0;
    return this.container;
  }
}
