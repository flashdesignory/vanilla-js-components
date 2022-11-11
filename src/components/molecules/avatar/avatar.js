// import sheet from './avatar.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./avatar.css";

import { DefaultAvatar } from "../../../assets/avatar.js";
import { Image } from "../../atoms/image/image.js";

export class Avatar {
  constructor({ image = {}, containerClass }) {
    this.state = {};
    this.containerClass = containerClass;
    
    this.container = document.createElement("div");
    this.container.classList.add("avatar-container");

    if (this.containerClass) {
      this.container.classList.add(this.containerClass);
    }

    this.update({ image });
  }

  update({ image }) {
    if (image !== undefined) this.state.image = image;

    if (!this.state.image.alt) {
      this.state.image.alt = "avatar image";
    }
  }

  render() {
    this.container.replaceChildren();

    if (this.state.image.src !== undefined) {
      const image = new Image({ fadeIn: true, ...this.state.image });
      this.container.appendChild(image.render());
    } else {
      this.container.insertAdjacentHTML("afterbegin", DefaultAvatar);
    }
    return this.container;
  }
}
