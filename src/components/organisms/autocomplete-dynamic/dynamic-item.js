import { Link } from "../../atoms/link/link.js";

export class DynamicItem {
  constructor({ data, role }) {
    this.state = {};

    this.item = document.createElement("li");
    this.item.classList.add("list-li");

    this.update({ data, role });
  }

  update({ data, role }) {
    if (data !== undefined) this.state.data = data;
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
