import { Skeleton } from "../../../misc/skeleton/skeleton.js";

export class Item {
  constructor(props) {
    this.container = document.createElement("div");
    this.container.classList.add("item-container");

    this.display = new Skeleton({
      avatarShape: "circle",
      shouldAnimate: true,
    });

    if (props) this.update(props);
  }

  update(props) {
    const { index, height, id } = props;
    this.index = index;
    this.height = height;
    this.id = id;
  }

  render() {
    this.container.id = this.id;
    this.container.style.transform = `translateY(${
      this.index * this.height
    }px)`;
    this.container.appendChild(this.display.render());
    return this.container;
  }
}
