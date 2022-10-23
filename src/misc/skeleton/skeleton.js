// import sheet from './skeleton.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
import "./skeleton.css";

export class Skeleton {
  constructor({ avatarShape = "square" }) {
    this.avatarShape = avatarShape;
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("skeleton");
    const left = document.createElement("div");
    left.classList.add("left");
    container.appendChild(left);

    for (let i = 0; i < 3; i++) {
      const line = document.createElement("div");
      line.classList.add("line");
      left.appendChild(line);
    }

    const right = document.createElement("div");
    right.classList.add("right");
    container.appendChild(right);

    const square = document.createElement("div");
    square.classList.add(`${this.avatarShape}`);
    right.appendChild(square);

    return container;
  }
}
