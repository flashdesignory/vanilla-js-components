// import sheet from './tooltip.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./tooltip.css";

export class Tooltip {
  constructor({ id, direction, label, type, content, style }) {
    this.state = {
      id: undefined, // string
      direction: undefined, // string
      label: undefined, // string;
      type: undefined, // "icon" | "text"
      content: undefined, // string
    };

    this.style = style;
    this.timeout = undefined;

    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("tooltip-container");

    if (this.style) {
      Object.keys(this.style).forEach(
        (key) => (this.container.style[key] = this.style[key])
      );
    }

    this.button = document.createElement("button");
    this.button.classList.add("button");
    this.button.addEventListener("mouseover", this.handleOnMouseOver);
    this.button.addEventListener("mouseleave", this.handleOnMouseOut);
    this.button.addEventListener("mouseout", this.handleOnMouseOut);
    this.container.appendChild(this.button);

    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");
    this.tooltip.role = "tooltip";
    this.container.appendChild(this.tooltip);

    this.update({ id, direction, label, type, content });
  }

  update({ id, direction, label, type, content }) {
    if (id !== undefined) this.state.id = id;
    if (direction !== undefined) this.state.direction = direction;
    if (label !== undefined) this.state.label = label;
    if (type !== undefined) this.state.type = type;
    if (content !== undefined) this.state.content = content;
  }

  handleOnMouseOver() {
    clearTimeout(this.timeout);
    this.tooltip.classList.add("show");
    this.timeout = setTimeout(() => this.button.dispatchEvent(new Event("mouseout")), 2000);
  }

  handleOnMouseOut(e) {
    clearTimeout(this.timeout);
    this.tooltip.classList.remove("show");
  }

  render() {
    if (this.state.id !== undefined) {
      this.button.setAttribute("aria-labeledby", this.state.id);
      this.tooltip.id = this.state.id;
    }

    if (this.type !== "icon") this.button.textContent = this.state.label;
    else this.button.insertAdjacentHTML("afterbegin", this.state.label);

    if (this.state.content !== undefined) {
      this.tooltip.textContent = this.state.content;
    }

    if (this.state.direction) {
      this.tooltip.classList.add(this.state.direction);
    }

    return this.container;
  }
}
