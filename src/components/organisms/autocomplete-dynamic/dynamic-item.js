import { Link } from "../../atoms/link/link.js";

export class DynamicItem {
  constructor({ role, ...data }) {
    this.state = {
      data: undefined, // unkown[]
      role: undefined, // "listitem" | "option"
    };

    this.item = document.createElement("li");
    this.item.classList.add("list-li");

    this.update({ role, data });
  }

  update({ role, data }) {
    if (data !== undefined) this.state.data = { ...data };
    if (role !== undefined) this.state.role = role;
  }

  render() {
    this.item.appendChild(
      new Link({
        label: this.state.data.title,
        url: this.state.data.link,
      }).render()
    );
    this.item.role = this.state.role;
    return this.item;
  }
}
