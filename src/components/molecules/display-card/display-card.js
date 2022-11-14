import { DisplayCardBase } from "./display-card-base.js";
import { Image } from "../../atoms/image/image.js";
import { Avatar } from "../avatar/avatar.js";
import { Text } from "../../atoms/text/text.js";

export class DisplayCard extends DisplayCardBase {
  constructor(props) {
    super();

    this.state = {
      index: undefined, // number
      id: undefined, // string
      height: undefined, // number
      y: undefined, // number
      data: undefined, // { avatar: Avatar, text: string, image: Image, metadata: string }
    };

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

  update({ index, id, height, y, ...data }) {
    if (index !== undefined) this.state.index = index;
    if (height !== undefined) this.state.height = height;
    if (y !== undefined) this.state.y = y;
    if (id !== undefined) this.state.id = id;
    if (data !== undefined) this.state.data = data;
  }

  render() {
    this.container.id = this.state.id;
    this.container.style.height = `${this.state.height}px`;

    if (this.state.y !== undefined) {
      this.container.style.transform = `translateY(${this.state.y}px)`;
    } else {
      this.container.style.transform = `translateY(${
        this.state.index * this.state.height
      }px)`;
    }

    // always add avatar;
    this.add(this.left, this.avatar, "avatar", undefined, {
      src: this.state.data.avatar,
    });

    if (this.state.data.text) {
      this.add(this.right, this.text, "text", "item-text", {
        text: this.state.data.text,
      });
    } else {
      this.remove(this.right, this.text);
    }

    if (this.state.data.image) {
      this.add(
        this.right,
        this.image,
        "image",
        "item-image",
        this.state.data.image
      );
    } else {
      this.remove(this.right, this.image);
    }

    if (this.state.data.metadata) {
      this.add(this.right, this.metadata, "metadata", "item-metadata", {
        text: this.state.data.metadata,
      });
    } else {
      this.remove(this.right, this.metadata);
    }

    return this.container;
  }

  add(parent, instance, name, className, data) {
    if (instance === undefined) {
      switch (name) {
        case "avatar":
          this[name] = new Avatar({
            image: { ...data },
          });
          break;
        case "text":
          this[name] = new Text({
            ...data,
            truncate: true,
            containerClass: className,
          });
          break;
        case "image":
          this[name] = new Image({
            ...data,
            imageClass: className,
          });
          break;
        case "metadata":
          this[name] = new Text({
            ...data,
            truncate: true,
            containerClass: className,
          });
          break;
      }
      parent.appendChild(this[name].render());
    } else {
      this[name].update({ ...data });
    }
  }

  remove(parent, instance) {
    if (instance === undefined) return;
    parent.removeChild(instance.container);
    instance = undefined;
  }
}
