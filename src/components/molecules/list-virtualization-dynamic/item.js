import { DefaultAvatar } from "../../../assets/avatar.js";

export class Item {
  constructor(props) {
    this.container = document.createElement("div");
    this.container.classList.add("item-container");

    if (props) this.update(props);
  }

  update(props) {
    const { data, yPosition } = props;
    this.data = data;
    this.yPosition = yPosition;
  }

  render() {
    this.container.id = this.data.id;
    this.container.style.transform = `translateY(${this.yPosition}px)`;

    // setting height depending on type
    if (this.data.type === "text") {
      this.container.classList.add("text");
    } else if (this.data.type === "image") {
      this.container.classList.add("image");
    }

    const avatar = document.createElement("div");
    avatar.classList.add("item-avatar");
    this.container.appendChild(avatar);

    avatar.insertAdjacentHTML("afterbegin", DefaultAvatar);

    const content = document.createElement("div");
    content.classList.add("item-content");
    this.container.appendChild(content);

    if (this.data.type === "text") {
      const description = document.createElement("div");
      description.classList.add("item-description");
      description.textContent = this.data.content;
      content.appendChild(description);
    } else if (this.data.type === "image") {
      const image = document.createElement("img");
      image.classList.add("item-image");
      image.src = this.data.source;
      image.width = this.data.width;
      image.height = this.data.height;
      content.appendChild(image);
    }

    const metadata = document.createElement("div");
    metadata.classList.add("item-metadata");
    metadata.textContent = this.data.metadata;
    content.appendChild(metadata);

    return this.container;
  }
}
