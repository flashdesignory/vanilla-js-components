export class Item {
  constructor({ label }) {
    this.state = {};

    this.item = document.createElement("li");
    this.item.classList.add("list-li");
    this.item.role = "option";

    this.update({ label });
  }

  update({ label }) {
    this.state.label = label;
  }

  render() {
    this.item.textContent = this.state.label;
    return this.item;
  }
}
