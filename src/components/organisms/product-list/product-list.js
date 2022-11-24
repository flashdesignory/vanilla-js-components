// import sheet from './product-table.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./product-list.css";

import { Text } from "../../atoms/text/text.js";
import { Input } from "../../atoms/input/input.js";
import { List } from "../../atoms/list/list.js";
import { Checkbox } from "../../atoms/checkbox/checkbox.js";
import { ProductItem } from "./product-item.js";
import { debounce } from "../../../lib/index.js";

export class ProductList {
  constructor({ data, title, errorText }) {
    this.state = {
      data: undefined, // { task: string, completed: boolean }[]
      title: undefined, // string
      errorText: undefined, // string
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    const debounced = debounce(this.handleOnInput, 250);

    this.container = document.createElement("div");
    this.container.classList.add("product-list-container");

    this.top = document.createElement("div");
    this.top.classList.add("product-list-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "product-list-title" });
    this.top.appendChild(this.header.render());

    this.input = new Input({
      id: "product-input",
      type: "search",
      placeholder: "Search for products..",
      onInput: debounced,
    });
    this.top.appendChild(this.input.render());

    this.filter = new Checkbox({
      id: "filter",
      label: "Show in-stock items only",
      onChange: this.handleOnChange,
    });
    this.top.appendChild(this.filter.render());

    this.list = new List({
      title: "data-list",
      onClick: this.handleOnClick,
      ItemClass: ProductItem,
    });
    this.container.appendChild(this.list.render());

    this.update({ data, title, errorText });
  }

  update({ data, title, errorText }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (errorText !== undefined) {
      this.state.errorText = errorText;
      this.list.update({ emptyListText: this.state.errorText });
    }

    if (data !== undefined) {
      this.state.data = [...data];
      this.list.update({ data: this.state.data });
      this.list.rebuild();
    }
  }

  handleOnInput(e) {
    const showInStockOnly = this.filter.input.checked;
    let items;

    if (!e.target.value) {
      items = showInStockOnly
        ? this.state.data.filter((row) => row.stocked)
        : [...this.state.data];
    } else {
      const searchterm = e.target.value.trim().toLowerCase();
      items = this.state.data.filter((row) => {
        if (showInStockOnly && !row.stocked) return;
        return (
          Object.values(row).filter((cell) =>
            cell.toString().toLowerCase().includes(searchterm)
          ).length > 0
        );
      });
    }

    this.list.update({ data: items });
    this.list.rebuild();
    this.list.render();
  }

  handleOnChange() {
    this.input.input.dispatchEvent(new Event("input"));
  }

  handleOnClick(e) {
    console.log(e.target);
  }

  render() {
    this.header.render();
    this.list.render();
    return this.container;
  }
}
