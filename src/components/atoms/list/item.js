export class Item {
  constructor({ data, role = "listitem" }) {
    this.state = {
      data: undefined, // string
      role: undefined, // "listitem" | "option"
    };

    this.item = document.createElement("li");
    this.item.tabIndex = 0;
    this.item.classList.add("list-li");

    this.update({ data, role });
  }

  update({ data, role }) {
    if (data !== undefined) this.state.data = data;
    if (role !== undefined) this.state.role = role;
  }

  render() {
    this.item.textContent = this.state.data;
    // this.item.role = this.state.role;
    this.item.setAttribute("role", this.state.role);
    return this.item;
  }
}
