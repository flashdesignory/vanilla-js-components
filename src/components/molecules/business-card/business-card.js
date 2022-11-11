/* import sheet from "./business-card.css" assert { type: "css" };
document.adoptedStyleSheets.push(sheet); */
import "./business-card.css";

import { Avatar } from '../avatar/avatar.js';
import { Text } from '../../atoms/text/text.js';
import { Link } from '../../atoms/link/link.js';

export class BusinessCard {
  constructor({ image, name, title, links }) {
    this.state = {};
    this.list = [];

    this.container = document.createElement("div");
    this.container.classList.add("business-card-container");

    this.left = document.createElement("div");
    this.left.classList.add("business-card-left");
    this.container.appendChild(this.left);

    this.right = document.createElement("div");
    this.right.classList.add("business-card-right");
    this.container.appendChild(this.right);

    this.top = document.createElement('div');
    this.top.classList.add("business-card-top");
    this.right.appendChild(this.top);

    this.bottom = document.createElement('div');
    this.bottom.classList.add("business-card-bottom");
    this.right.appendChild(this.bottom);

    this.avatar = new Avatar({ containerClass: "business-card-avatar" });
    this.left.appendChild(this.avatar.render());

    this.name = new Text({ containerClass: "business-card-name" });
    this.top.appendChild(this.name.render());

    this.title = new Text({ containerClass: "business-card-title" });
    this.top.appendChild(this.title.render());

    this.update({ image, name, title, links });

    if (links && links.length > 0) {
      this.rebuild();
    }
  }

  update({ image, name, title, links }) {
    if (image !== undefined) {
      this.state.image = {...image};
      this.avatar.update({ image: this.state.image });
    }

    if (name !== undefined) {
      this.state.name = name;
      this.name.update({ text: this.state.name});
    }

    if (title !== undefined) {
      this.state.title = title;
      this.title.update({ text: this.state.title });
    }

    if (links !== undefined) {
      this.state.links = links;
    }
  }

  rebuild() {
    this.state.links.forEach(link => {
      const { name, type, label, url, target } = link;
      const element = new Link({
        name,
        type,
        label,
        url,
        target,
      });
      this.list.push(element);
    })
  }

  render() {
    this.avatar.render();
    this.name.render();
    this.title.render();

    this.bottom.replaceChildren();
    this.list.forEach((item) => {
      this.bottom.appendChild(item.render());
    });

    return this.container;
  }
}
