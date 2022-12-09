// import sheet from './use-cache-example.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./use-cache-example.css";

import { Text } from "../../components/atoms/text/text.js";
import { DisplayStatus } from "../../components/molecules/display-status/display-status.js";
import { InputForm } from "../../components/molecules/input-form/input-form.js";
import { MultiInputForm } from "../../components/molecules/input-form/multi-input-form.js";
import { hasValidMin } from "../../lib/validators.js";
import { useCache } from "./use-cache.js";

export class UseCacheExample {
  constructor({ title }) {
    this.state = {
      title: undefined, // string
    };

    this.cache = useCache();

    this.getItem = this.getItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("use-cache-example-container");

    this.top = document.createElement("div");
    this.top.classList.add("use-cache-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "use-cache-title" });
    this.top.appendChild(this.header.render());

    this.addForm = new MultiInputForm({
      id: "use-cache-add",
      onSubmit: this.addItem,
      submitText: "add",
      data: [
        {
          id: "cacheKey",
          type: "text",
          placeholder: "Cache Key",
        },
        {
          id: "cacheValue",
          type: "text",
          placeholder: "Cache Value",
        },
      ],
    });
    this.container.appendChild(this.addForm.render());

    this.getForm = new InputForm({
      id: "use-cache-get",
      onSubmit: this.getItem,
      placeholder: "Cache Key",
      submitText: "get",
    });
    this.container.appendChild(this.getForm.render());

    this.deleteForm = new InputForm({
      id: "use-cache-delete",
      onSubmit: this.deleteItem,
      placeholder: "Cache Key",
      submitText: "delete",
    });
    this.container.appendChild(this.deleteForm.render());

    this.status = new DisplayStatus({
      namespace: "cache",
      showTimespamp: true,
      containerClass: "use-cache-status",
    });
    this.container.appendChild(this.status.render());
    this.status.log({ msg: "idle" });

    this.body = document.createElement("div");
    this.body.classList.add("use-cache-body");
    this.container.appendChild(this.body);

    this.code = document.createElement("code");
    this.code.classList.add("use-cache-code");
    this.body.appendChild(this.code);

    this.update({ title });

    this.rebuild();
  }

  update({ title }) {
    if (title !== undefined) {
      this.state.title = title;
      this.header.update({ text: this.state.title });
    }
  }

  rebuild() {
    this.code.textContent = JSON.stringify(this.cache.getCache(), null, 4);
  }

  getItem(e) {
    const inputtext = e.target.elements.input.value.trim().toString();
    if (!hasValidMin(inputtext, 2)) return;
    const response = this.cache.getValue(inputtext);
    this.status.log({ msg: `get: ${JSON.stringify(response)}` });
  }

  addItem(e) {
    const key = e.target.elements.cacheKey.value.trim().toString();
    if (!hasValidMin(key, 2)) return;
    const value = e.target.elements.cacheValue.value.trim().toString();
    if (!hasValidMin(value, 2)) return;
    const response = this.cache.setValue(key, value);
    this.status.log({ msg: `add: ${JSON.stringify(response)}` });
    this.rebuild();
  }

  deleteItem(e) {
    const inputtext = e.target.elements.input.value.trim().toString();
    if (!hasValidMin(inputtext, 2)) return;
    const response = this.cache.deleteValue(inputtext);
    this.status.log({ msg: `delete: ${JSON.stringify(response)}` });
    this.rebuild();
  }

  render() {
    this.header.render();
    this.addForm.render();

    return this.container;
  }
}
