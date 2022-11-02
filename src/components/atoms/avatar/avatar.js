// import sheet from './avatar.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./avatar.css";

import { DefaultAvatar } from "../../../assets/avatar.js";
import { Image } from "../image/image.js";

export class Avatar {
  constructor({ image = {} }) {
    this.image = image;

    this.container = document.createElement("div");
    this.container.classList.add("avatar-container");
  }

  render() {
    if (this.image.src !== undefined) {
      const image = new Image({ ...this.image });
      this.container.appendChild(image.render());
    } else {
      this.container.insertAdjacentHTML("afterbegin", DefaultAvatar);
    }
    return this.container;
  }
}
