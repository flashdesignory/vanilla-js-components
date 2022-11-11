// import sheet from './link.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./link.css";

export class Link {
  constructor({ icon, name, url, target }) {
    this.state = {};

    this.update({ icon, name, url, target });
  }

  update({ icon, name, url, target }) {
    if (icon !== undefined) {
      this.state.icon = icon;
    }

    if (name !== undefined) {
      this.state.name = name;
    }

    if (url !== undefined) {
      this.state.url = url;
    }

    if (target !== undefined) {
      this.state.target = target;
    }
  }

  render() {
    const link = document.createElement("a");
    link.classList.add("link");

    if (this.state.url) {
      link.href = this.state.url;
    }
    if (this.state.target) {
      link.target = this.state.target;
    }

    if (this.state.icon) {
      const span = document.createElement("span");
      span.classList.add("link-icon");
      span.insertAdjacentHTML("afterbegin", this.state.icon);
      link.appendChild(span);
    }

    if (this.state.name) {
      const span = document.createElement("span");
      span.classList.add("link-text");
      span.textContent = this.state.name;
      link.appendChild(span);
    }

    return link;
  }
}
