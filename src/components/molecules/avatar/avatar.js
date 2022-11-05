// import sheet from './avatar.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./avatar.css";

import { DefaultAvatar } from "../../../assets/avatar.js";
import { Image } from "../../atoms/image/image.js";

export class Avatar {
  constructor({ image = {} }) {
    this.container = document.createElement("div");
    this.container.classList.add("avatar-container");
    this.update({ image });
  }

  update({ image }) {
    this.image = image;
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
