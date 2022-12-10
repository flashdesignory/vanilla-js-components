// import sheet from './use-store-example.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./use-store-example.css";

import { Text } from "../../components/atoms/text/text.js";
import { DisplayStatus } from "../../components/molecules/display-status/display-status.js";
import { InputForm } from "../../components/molecules/input-form/input-form.js";
import { MultiInputForm } from "../../components/molecules/input-form/multi-input-form.js";
import { hasValidMin } from "../../lib/validators.js";
import { useStore } from "./use-store.js";

export class UseStoreExample {
  constructor({ title, namespace }) {
    this.state = {
      title: undefined, // string
    };

    this.namespace = namespace

    this.store = useStore(this.namespace);

    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("use-store-example-container");

    this.top = document.createElement("div");
    this.top.classList.add("use-store-header");
    this.container.appendChild(this.top);

    this.header = new Text({ containerClass: "use-store-title" });
    this.top.appendChild(this.header.render());

    this.addForm = new MultiInputForm({
      id: "use-store-add",
      onSubmit: this.setState,
      submitText: "add",
      data: [
        {
          id: "stateKeyAdd",
          type: "text",
          placeholder: "State Key",
        },
        {
          id: "stateValueAdd",
          type: "text",
          placeholder: "State Value",
        },
      ],
    });
    this.container.appendChild(this.addForm.render());

    this.getForm = new InputForm({
      id: "use-store-get",
      onSubmit: this.getState,
      placeholder: "State Key",
      submitText: "get",
    });
    this.container.appendChild(this.getForm.render());

    this.status = new DisplayStatus({
      namespace: "cache",
      showTimespamp: true,
      containerClass: "use-store-status",
    });
    this.container.appendChild(this.status.render());
    this.status.log({ msg: "idle" });

    this.body = document.createElement("div");
    this.body.classList.add("use-store-body");
    this.container.appendChild(this.body);

    this.code = document.createElement("code");
    this.code.classList.add("use-store-code");
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
    // just get store for namespace
    // this.code.textContent = JSON.stringify(this.store.getStore(this.namespace), null, 4);

    // get full store
    this.code.textContent = JSON.stringify(this.store.getStore(), null, 4);
  }

  getState(e) {
    const inputtext = e.target.elements.input.value.trim().toString();
    if (!hasValidMin(inputtext, 2)) return;
    const response = this.store.getState(inputtext);
    this.status.log({ msg: `get: ${JSON.stringify(response)}` });
  }

  setState(e) {
    const key = e.target.elements.stateKeyAdd.value.trim().toString();
    if (!hasValidMin(key, 2)) return;
    const value = e.target.elements.stateValueAdd.value.trim().toString();
    if (!hasValidMin(value, 2)) return;

    const response = this.store.setState(key, value);
    this.status.log({ msg: `add: ${JSON.stringify(response)}` });
    this.rebuild();
  }

  render() {
    this.header.render();
    this.addForm.render();

    return this.container;
  }
}
