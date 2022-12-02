// import sheet from './masonry.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./masonry.css";

import { DisplayImage } from "../../components/molecules/display-image/display-image.js";

export class Masonry {
  constructor({ numColumns, data = [], onLastItem }) {
    this.state = {
      numColumns: undefined, // number
      data: [], // unknown[]
    };

    this.onLastItem = onLastItem;
    this.isFetching = false;
    this.lastListElement = undefined;
    this.observerConfig = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    this.handleOnObserve = this.handleOnObserve.bind(this);
    this.observer = new IntersectionObserver(
      this.handleOnObserve,
      this.observerConfig
    );

    this.columns = {};

    this.container = document.createElement("div");
    this.container.classList.add("masonry-container");

    this.content = document.createElement("div");
    this.content.classList.add("masonry-content");
    this.container.appendChild(this.content);

    this.update({ numColumns, data });

    // display initial list items
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ numColumns, data }) {
    if (numColumns !== undefined) this.state.numColumns = numColumns;
    if (data !== undefined) this.state.data = [...this.state.data, ...data];

    this.isFetching = false;
  }

  rebuild() {
    this.columns = {};
    // create an array for each column
    for (let i = 0; i < this.state.numColumns; i++) {
      this.columns[i] = [];
    }

    // push element data in the appropriate column
    for (let i = 0; i < this.state.data.length; i++) {
      const index = i % this.state.numColumns;
      const props = {
        index: i,
        id: this.state.data[i].id,
        width: this.state.data[i].image.width,
        height: this.state.data[i].image.height,
        data: this.state.data[i].image,
      };
      this.columns[index].push(new DisplayImage(props));
    }
  }

  handleOnObserve(entries, observer) {
    if (this.lastListElement === undefined) return;

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === this.lastListElement.id) {
        observer.unobserve(entry.target);
        this.lastListElement = undefined;
        this.isFetching = true;
        if (this.onLastItem) this.onLastItem();
        return;
      }
    });
  }

  render() {
    if (this.lastListElement) {
      this.observer.unobserve(this.lastListElement);
      this.lastListElement = undefined;
    }

    this.content.replaceChildren();

    for (let i = 0; i < this.state.numColumns; i++) {
      const columnData = this.columns[i];
      const column = document.createElement("div");
      column.classList.add("masonry-column");

      columnData.forEach((item) => {
        const itemElement = item.render();
        column.appendChild(itemElement);

        if (
          item.state.id === this.state.data[this.state.data.length - 1].id &&
          !this.isFetching
        ) {
          this.lastListElement = itemElement;
          this.observer.observe(this.lastListElement);
        }
      });

      this.content.appendChild(column);
    }
    return this.container;
  }
}
