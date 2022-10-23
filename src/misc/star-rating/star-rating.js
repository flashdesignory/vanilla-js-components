// import sheet from './star-rating.css' assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
import "./star-rating.css";

export class StarRating {
  constructor() {
    this.containerElement = document.createElement("div");
    this.containerElement.classList.add("ratings-container");

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
    const contentElement = document.createElement("div");
    contentElement.classList.add("ratings-content");
    this.containerElement.appendChild(contentElement);

    for (let i = 5; i > 0; i--) {
      const starElement = document.createElement("div");
      starElement.classList.add("ratings-star");
      starElement.id = i;
      starElement.innerHTML = "&starf;";
      starElement.addEventListener("click", this.updateRating);
      this.stars.push(starElement);
      contentElement.appendChild(starElement);
    }

    return this.containerElement;
  }
}
