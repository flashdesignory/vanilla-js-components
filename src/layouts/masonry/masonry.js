// import sheet from './masonry.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./masonry.css";

import { DisplayImage } from "../../components/molecules/display-image/display-image.js";

export class Masonry {
  constructor({ numColumns, data = [] }) {
    this.state = {
      numColumns: undefined, // number
      data: [], // unknown[]
    };

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

  render() {
    this.content.replaceChildren();

    for (let i = 0; i < this.state.numColumns; i++) {
      const columnData = this.columns[i];
      const column = document.createElement("div");
      column.classList.add("masonry-column");

      columnData.forEach((item) => {
        column.appendChild(item.render());
      });

      this.content.appendChild(column);
    }
    return this.container;
  }
}
