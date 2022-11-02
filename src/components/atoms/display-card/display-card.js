import { DisplayCardBase } from "./display-card-base.js";
import { Image } from "../image/image.js";
import { Avatar } from "../avatar/avatar.js";
import { Text } from "../text/text.js";

export class DisplayCard extends DisplayCardBase {
  constructor(props) {
    super();

    this.content = document.createElement("div");
    this.content.classList.add("item-content");
    this.container.appendChild(this.content);

    this.left = document.createElement("div");
    this.left.classList.add("left");
    this.content.appendChild(this.left);

    this.right = document.createElement("div");
    this.right.classList.add("right");
    this.content.appendChild(this.right);

    if (props) this.update(props);
  }

  update(props) {
    const { index, id, height, y, ...data } = props;
    this.index = index;
    this.height = height;
    this.y = y;
    this.id = id;
    this.data = data;
  }

  render() {
    this.container.id = this.id;
    this.container.style.height = `${this.height}px`;

    if (this.y) {
      this.container.style.transform = `translateY(${this.y}px)`;
    } else {
      this.container.style.transform = `translateY(${
        this.index * this.height
      }px)`;
    }

    const avatar = new Avatar({
      image: {
        src: this.data.avatar,
      },
    });
    this.left.appendChild(avatar.render());

    if (this.data.text) {
      const text = new Text({
        content: this.data.text,
        truncate: true,
        containerClass: "item-text",
      });
      this.right.appendChild(text.render());
    }

    if (this.data.image) {
      const { src, width, height, alt } = this.data.image;
      const image = new Image({
        src,
        width,
        height,
        alt,
        imageClass: "item-image",
      });
      this.right.appendChild(image.render());
    }

    if (this.data.metadata) {
      const metadata = new Text({
        content: this.data.metadata,
        containerClass: "item-metadata",
      });
      this.right.appendChild(metadata.render());
    }

    return this.container;
  }
}
