export class Item {
  constructor({ label, role = "listitem" }) {
    this.state = {
      label: undefined, // string
      role: undefined, // "listitem" | "option"
    };

    this.item = document.createElement("li");
    this.item.classList.add("list-li");

    this.update({ label, role });
  }

  update({ label, role }) {
    if (label !== undefined) this.state.label = label;
    if (role !== undefined) this.state.role = role;
  }

  render() {
    this.item.textContent = this.state.label;
    this.item.role = this.state.role;
    return this.item;
  }
}
