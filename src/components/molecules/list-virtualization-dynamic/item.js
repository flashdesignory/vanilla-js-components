export class Item {
  constructor({ data, yPosition }) {
    this.data = data;
    this.yPosition = yPosition;
  }

  render() {
    this.containerElement = document.createElement("div");
    this.containerElement.classList.add("item-container");
    this.containerElement.style.transform = `translateY(${this.yPosition}px)`;

    // setting height depending on type
    if (this.data.type === "text") {
      this.containerElement.classList.add("text");
    } else if (this.data.type === "image") {
      this.containerElement.classList.add("image");
    }

    const avatarElement = document.createElement("div");
    avatarElement.classList.add("item-avatar");
    this.containerElement.appendChild(avatarElement);

    const contentElement = document.createElement("div");
    contentElement.classList.add("item-content");
    this.containerElement.appendChild(contentElement);

    if (this.data.type === "text") {
      const descriptionElement = document.createElement("div");
      descriptionElement.classList.add("item-description");
      descriptionElement.textContent = this.data.content;
      contentElement.appendChild(descriptionElement);
    } else if (this.data.type === "image") {
      const imageElement = document.createElement("img");
      imageElement.classList.add("item-image");
      imageElement.src = this.data.source;
      imageElement.width = this.data.width;
      imageElement.height = this.data.height;
      contentElement.appendChild(imageElement);
    }

    const metadataElement = document.createElement("div");
    metadataElement.classList.add("item-metadata");
    metadataElement.textContent = this.data.metadata;
    contentElement.appendChild(metadataElement);

    return this.containerElement;
  }
}
