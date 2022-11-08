// import sheet from './avatar.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./avatar.css";

import { DefaultAvatar } from "../../../assets/avatar.js";
import { Image } from "../../atoms/image/image.js";

export class Avatar {
  constructor({ image = {} }) {
    this.state = {};
    this.container = document.createElement("div");
    this.container.classList.add("avatar-container");
    this.update({ image });
  }

  update({ image }) {
    if (image !== undefined) this.state.image = image;

    if (!this.state.image.alt) {
      this.state.image.alt = "avatar image";
    }
  }

  render() {
    if (this.state.image.src !== undefined) {
      const image = new Image({ ...this.state.image });
      this.container.appendChild(image.render());
    } else {
      this.container.insertAdjacentHTML("afterbegin", DefaultAvatar);
    }
    return this.container;
  }
}
