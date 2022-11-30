// import sheet from './star-rating.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./star-rating.css";

export class StarRating {
  constructor({ currentRating, disabled, onChange }) {
    this.state = {
      currentRating: 0, // number
      disabled: undefined, // boolean
    };

    this.onChange = onChange;
    this.stars = [];

    this.updateDisplay = this.updateDisplay.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("ratings-container");

    this.content = document.createElement("div");
    this.content.classList.add("ratings-content");
    this.container.appendChild(this.content);

    for (let i = 5; i > 0; i--) {
      const star = document.createElement("div");
      star.classList.add("ratings-star");
      star.id = i;
      star.innerHTML = "&starf;";
      star.role = "img";
      star.setAttribute("aria-label", `star ${i}`);

      if (!disabled) star.addEventListener("click", this.updateDisplay);
      else star.classList.add("disabled");

      this.stars.push(star);
      this.content.appendChild(star);
    }

    this.status = document.createElement("div");
    this.status.classList.add("visually-hidden");
    this.container.appendChild(this.status);

    this.update({ currentRating, disabled });
  }

  update({ currentRating, disabled }) {
    if (currentRating !== undefined) this.state.currentRating = currentRating;
    if (disabled !== undefined) this.state.disabled = disabled;
  }

  updateDisplay(e) {
    this.update({ currentRating: e.target.id });
    this.render();
    if (this.onChange) this.onChange(e);
  }

  render() {
    this.stars.forEach((star) => {
      if (star.id <= this.state.currentRating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });

    this.status.textContent = `rating: ${this.state.currentRating} out of 5`;

    return this.container;
  }
}
