// import sheet from './star-rating.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./star-rating.css";

export class StarRating {
  constructor({ currentRating, disabled, onChange }) {
    this.state = {
      currentRating: undefined, // number
      disabled: undefined, // boolean
    }

    this.onChange = onChange;
    this.stars = [];

    this.updateRating = this.updateRating.bind(this);

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

      if (!disabled) star.addEventListener("click", this.updateRating);
      else star.classList.add("disabled");

      this.stars.push(star);
      this.content.appendChild(star);
    }

    this.update({ currentRating, disabled });
  }

  update({ currentRating, disabled }) {
    if (currentRating !== undefined) this.state.currentRating = currentRating;
    if (disabled !== undefined) this.state.disabled = disabled;
  }

  updateRating(e) {
    this.update({ currentRating: e.target.id })
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

    return this.container;
  }
}
