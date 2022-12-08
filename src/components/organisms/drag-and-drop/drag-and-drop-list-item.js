import { Item } from "../../atoms/list/item.js";
import { DraggableIcon } from "../../../assets/draggable.js";

export class DraggableItem extends Item {
  constructor({ data, role = "listitem" }) {
    super({ data, role });
  }

  render() {
    this.content = document.createElement("div");
    this.content.classList.add("content");
    this.content.textContent = this.state.data;
    this.item.appendChild(this.content);

    this.icon = document.createElement("div");
    this.icon.classList.add("icon");
    this.icon.insertAdjacentHTML("afterbegin", DraggableIcon());
    this.item.appendChild(this.icon);

    this.item.role = this.state.role;
    return this.item;
  }
}
