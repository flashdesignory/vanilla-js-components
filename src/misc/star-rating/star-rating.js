// import sheet from './star-rating.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./star-rating.css";

export class StarRating {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("ratings-container");

    this.currentRating = 0;
    this.stars = [];

    this.updateRating = this.updateRating.bind(this);
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
  }

  render() {
    const content = document.createElement("div");
    content.classList.add("ratings-content");
    this.container.appendChild(content);

    for (let i = 5; i > 0; i--) {
      const star = document.createElement("div");
      star.classList.add("ratings-star");
      star.id = i;
      star.innerHTML = "&starf;";
      star.addEventListener("click", this.updateRating);
      this.stars.push(star);
      content.appendChild(star);
    }

    return this.container;
  }
}
