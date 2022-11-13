// import sheet from './skeleton.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./skeleton.css";

export class Skeleton {
  constructor({ avatarShape = "square" }) {
    this.state = {
      avatarShape: undefined, // "square" | "circle"
    };

    this.container = document.createElement("div");
    this.container.classList.add("skeleton-container");
    this.left = document.createElement("div");
    this.left.classList.add("skeleton-left");
    this.container.appendChild(this.left);

    for (let i = 0; i < 3; i++) {
      const line = document.createElement("div");
      line.classList.add("skeleton-line");
      this.left.appendChild(line);
    }

    this.right = document.createElement("div");
    this.right.classList.add("skeleton-right");
    this.container.appendChild(this.right);

    this.avatar = document.createElement("div");
    this.right.appendChild(this.avatar);

    this.update({ avatarShape });
  }

  update({ avatarShape }) {
    if (avatarShape !== undefined) this.state.avatarShape = avatarShape;
  }

  render() {
    this.avatar.classList.add(`skeleton-${this.state.avatarShape}`);
    return this.container;
  }
}
