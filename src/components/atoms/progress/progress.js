// import sheet from './progress.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./progress.css";

export class Progress {
  constructor({ percentage, active }) {
    this.state = {
      active: undefined, // boolean
      percentage: undefined, // number
    };

    this.container = document.createElement("div");
    this.container.classList.add("progress-container");

    this.progress = document.createElement("div");
    this.progress.classList.add("progress");
    this.container.appendChild(this.progress);

    this.update({ percentage, active });
  }

  update({ percentage, active }) {
    if (active !== undefined) this.state.active = active;
    if (percentage !== undefined) this.state.percentage = percentage;

    if (this.state.percentage < 0) this.state.percentage = 0;
    if (this.state.percentage > 100) this.state.percentage = 100;
  }

  render() {
    this.progress.style.width = `${this.state.percentage}%`;
    if (this.state.active) this.container.classList.add("active");
    else this.container.classList.remove("active");
    return this.container;
  }
}
