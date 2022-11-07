// import sheet from './star-rating.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./star-rating.css";

export class StarRating {
  constructor({ onChange }) {
    this.onChange = onChange;
    this.currentRating = 0;
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
      star.addEventListener("click", this.updateRating);
      this.stars.push(star);
      this.content.appendChild(star);
    }
  }

  updateRating(e) {
    this.currentRating = e.target.id;
    this.stars.forEach((star) => {
      if (star.id <= this.currentRating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
    if (this.onChange) this.onChange(e);
  }

  render() {
    return this.container;
  }
}
