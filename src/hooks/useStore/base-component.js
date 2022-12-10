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

    this.store = useStore(this.namespace);

    this.state[this.namespace] = {...this.store.getStore(this.namespace)};
    this.update = this.update.bind(this);
    this.store.subscribe(this.update);

    this.container = document.createElement("div");
    this.container.classList.add("base-component-container");
  }

  update(state) {
    this.state[this.namespace] = {...state};
    this.render();
  }

  render() {
    this.container.replaceChildren();
    this.container.textContent = JSON.stringify(this.state[this.namespace], null, 4);
    return this.container;
  }
}
