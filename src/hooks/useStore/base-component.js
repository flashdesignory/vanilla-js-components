import { useStore } from "./use-store.js";

// import sheet from './base-component.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./base-component.css";

export class BaseComponent {
  constructor({
    namespace
  }) {
    this.state = {};

    this.namespace = namespace

    this.store = useStore({ namespace: this.namespace });

    this.state[this.namespace] = {...this.store.getStore(this.namespace)};
    this.update = this.update.bind(this);
    this.store.subscribe(this.update);

    this.container = document.createElement("div");
    this.container.classList.add("base-component-container");

    this.header = document.createElement("div");
    this.header.classList.add("base-component-header");
    this.container.appendChild(this.header);

    this.body = document.createElement("div");
    this.body.classList.add("base-component-body");
    this.container.appendChild(this.body);
  }

  update(state) {
    this.state[this.namespace] = {...state};
    this.render();
  }

  render() {
    this.body.replaceChildren();
    this.header.textContent = `Base component is listening for state changes of: ${this.namespace ? this.namespace : "all state"}`;
    this.body.textContent = JSON.stringify(this.state[this.namespace], null, 4);
    return this.container;
  }
}
