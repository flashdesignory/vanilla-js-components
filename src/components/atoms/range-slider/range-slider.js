// import sheet from './range-slider.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./range-slider.css";

export class RangeSlider {
  constructor({ id, value, onChange }) {
    this.state = {
      id: undefined, // string
      value: undefined, // number
    };

    this.onChange = onChange;
    this.mouseDown = false;

    this.handleOnChange = this.handleOnChange.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("range-slider-container");
    this.container.tabIndex = 0;

    this.label = document.createElement("label");
    this.label.classList.add("label");
    this.container.appendChild(this.label);

    this.input = document.createElement("input");
    this.input.type = "range";
    this.input.min = 0;
    this.input.max = 100;
    this.input.addEventListener("change", this.handleOnChange);
    this.input.addEventListener("input", this.handleOnChange);
    this.label.appendChild(this.input);

    this.track = document.createElement("div");
    this.track.classList.add("track");
    this.label.appendChild(this.track);

    this.handle = document.createElement("div");
    this.handle.classList.add("handle");
    this.label.appendChild(this.handle);

    this.status = document.createElement("div");
    this.status.classList.add("visually-hidden");
    this.label.appendChild(this.status);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.capture = this.capture.bind(this);

    this.container.addEventListener("mousedown", this.start);
    document.addEventListener("mousemove", this.capture);
    document.addEventListener("mouseup", this.stop);
    document.addEventListener("mouseleave", this.stop);

    this.container.addEventListener("touchstart", this.start);
    document.addEventListener("touchmove", this.capture);
    document.addEventListener("touchend", this.stop);

    this.update({ id, value });
    // temp delay for now
    if (value !== undefined) setTimeout(() => this.handleOnChange(), 50);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.state.value = value;
  }

  update({ id, value }) {
    if (id !== undefined) this.state.id = id;
    if (value !== undefined) this.state.value = value;
  }

  capture(e) {
    if (!this.mouseDown) return;

    const offsetX = this.label.getBoundingClientRect().left;
    const trackWidth = this.label.getBoundingClientRect().width;

    // const localX = e.clientX - offsetX;
    const localX = e.touches
      ? e.touches[0].clientX - offsetX
      : e.clientX - offsetX;
    let percentX = localX / trackWidth;
    if (percentX < 0) percentX = 0;
    if (percentX > 1) percentX = 1;
    percentX = Math.floor(percentX.toFixed(2) * 100);

    this.value = percentX;
    this.input.dispatchEvent(new Event("input"));
  }

  start(e) {
    this.mouseDown = true;
    this.capture(e);
  }

  stop() {
    if (this.mouseDown) {
      // this.container.dispatchEvent(new CustomEvent("change", { detail: this.state.value }));
      this.mouseDown = false;
    }
  }

  handleOnChange(e) {
    console.log("handleOnChange");
    this.status.textContent = `value: ${this.state.value}`;
    // calculations based on parent (label);
    this.track.style.width = `${this.state.value}%`;
    this.handle.style.left = `clamp(0px, calc(${this.state.value}% - 11px), calc(100% - 22px))`;

    if (this.onChange && e !== undefined) this.onChange(e);
  }

  render() {
    this.label.htmlFor = this.state.id;
    this.input.id = this.state.id;
    this.input.value = this.state.value;

    return this.container;
  }
}
