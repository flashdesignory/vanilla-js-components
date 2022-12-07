// import sheet from './display-status.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./display-status.css";

export class DisplayStatus {
  constructor({ namespace, showTimespamp = false, maxNumLogs = 10, containerClass }) {
    this.logs = [];

    this.state = {
      namespace: undefined, // string
      showTimespamp: undefined, // boolean
      maxNumLogs: undefined, // number
    };

    this.containerClass = containerClass;

    this.container = document.createElement("div");
    this.container.classList.add("display-status-container");

    if (this.containerClass) {
      this.container.classList.add(this.containerClass);
    }

    this.list = document.createElement("ul");
    this.list.classList.add("display-status-list");
    this.container.appendChild(this.list);

    this.update({ namespace, showTimespamp, maxNumLogs });
  }

  update({ namespace, showTimespamp, maxNumLogs }) {
    if (namespace !== undefined) {
      this.state.namespace = namespace;
    }

    if (showTimespamp !== undefined) {
      this.state.showTimespamp = showTimespamp;
    }

    if (maxNumLogs !== undefined) {
      this.state.maxNumLogs = maxNumLogs;
    }
  }

  log({ msg }) {
    this.logs.push({ time: Date.now(), message: msg });

    if (this.logs.length > this.state.maxNumLogs) {
      this.logs = this.logs.slice(1);
      this.list.removeChild(this.list.firstChild);
    }

    const { namespace, showTimespamp } = this.state;

    const message =
      (namespace !== undefined ? `${namespace} :: ` : "") +
      (showTimespamp ? `${new Date().toLocaleTimeString()} :: ` : "") +
      `${msg}`;

    const item = document.createElement("li");
    item.classList.add("display-status-item");
    item.textContent = message;
    this.list.appendChild(item);
    item.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return this.container;
  }
}
