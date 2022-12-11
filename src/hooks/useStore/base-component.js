import { useStore } from "./use-store.js";

// import sheet from './base-component.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./base-component.css";

import { Text } from "../../components/atoms/text/text.js";

export class BaseComponent {
  constructor({ namespace }) {
    this.state = {};

    this.namespace = namespace;

    this.store = useStore({ namespace: this.namespace });

    this.update = this.update.bind(this);
    this.store.subscribe(this.update);

    this.container = document.createElement("div");
    this.container.classList.add("base-component-container");

    this.header = new Text({ containerClass: "base-component-header" });
    this.container.appendChild(this.header.render());

    this.body = new Text({ containerClass: "base-component-body" });
    this.container.appendChild(this.body.render());

    this.update({ ...this.store.getStore(this.namespace) });
  }

  update(state) {
    this.state[this.namespace] = { ...state };
    this.header.update({
      text: `Base component is listening for state changes of: ${
        this.namespace ? this.namespace : "all state"
      }`,
    });
    this.body.update({
      text: JSON.stringify(this.state[this.namespace], null, 4),
    });
    this.render();
  }

  render() {
    this.header.render();
    this.body.render();
    return this.container;
  }
}
