// import sheet from './autocomplete.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./autocomplete.css";

import { Text } from "../../atoms/text/text.js";
import { Input } from "../../atoms/input/input.js";
import { List } from "../../atoms/list/list.js";
import { Loader } from "../../../misc/loader/loader.js";
import { debounce } from "../../../lib/index.js";
import { cancellableFetch } from "../../../lib/index.js";

export class AutoComplete {
  constructor({ title, errorText, url, responseParser, ItemClass }) {
    this.state = {
      title: undefined, // string
      errorText: undefined, // string
      url: undefined, // string
      responseParser: undefined, // function
      ItemClass: undefined, // class
    };

    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    const debounced = debounce(this.handleOnInput, 250);

    this.container = document.createElement("div");
    this.container.classList.add("dynamic-autocomplete-container");

    this.top = document.createElement("div");
    this.top.classList.add("autocomplete-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "autocomplete-title" });
    this.top.appendChild(this.header.render());

    this.input = new Input({
      id: "search-input",
      type: "search",
      placeholder: "Start typing..",
      onInput: debounced,
    });
    this.top.appendChild(this.input.render());

    this.list = new List({
      onClick: this.handleOnClick,
      title: "results list",
      role: "list",
    });
    this.container.appendChild(this.list.render());

    this.loader = new Loader({ size: 20 });

    this.update({ title, errorText, url, responseParser, ItemClass });
  }

  update({ title, errorText, url, responseParser, ItemClass }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }

    if (errorText !== undefined) {
      this.state.errorText = errorText;
      this.list.update({ emptyListText: this.state.errorText });
    }

    if (url !== undefined) {
      this.state.url = url;
    }

    if (responseParser !== undefined) {
      this.state.responseParser = responseParser;
    }

    if (ItemClass !== undefined) {
      this.state.ItemClass = ItemClass;
      this.list.update({ ItemClass });
    }
  }

  async handleOnInput(e) {
    let items;

    if (!e.target.value) {
      items = [];
    } else {
      const searchterm = e.target.value.trim().toLowerCase();
      if (!this.top.contains(this.loader.container)) {
        this.top.appendChild(this.loader.render());
      }
      const response = await this.fetchData(searchterm);
      if (this.top.contains(this.loader.container)) {
        this.top.removeChild(this.loader.container);
      }
      items = this.state.responseParser
        ? this.state.responseParser(response)
        : response;
    }

    this.list.update({ data: items });
    this.list.rebuild();
    this.list.render();
  }

  async fetchData(value) {
    // const response = await fetch(`${this.state.url}${value}`);
    const response = await cancellableFetch(
      `${this.state.url}${value}`,
      {},
      true
    );
    const data = await response.json();
    return data;
  }

  handleOnClick(e) {
    if (!e.target.role !== "listItem") return;

    /*
    // empty list?
    this.input.update({ value: "" });
    this.input.render();

    this.list.update({ data: [] });
    this.list.rebuild();
    this.list.render();
    */
  }

  render() {
    this.header.render();
    return this.container;
  }
}
