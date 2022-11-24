export class ProductItem {
  constructor({ data, role = "listitem" }) {
    this.state = {
      data: undefined, // string
      role: undefined, // "listitem" | "option"
    };

    this.item = document.createElement("li");
    this.item.classList.add("list-li");

    this.update({ data, role });
  }

  update({ data, role }) {
    if (data !== undefined) this.state.data = data;
    if (role !== undefined) this.state.role = role;
  }

  render() {
    if (!this.state.data.stocked) this.item.classList.add("out-of-stock");
    this.item.textContent = this.state.data.name;
    this.item.role = this.state.role;
    return this.item;
  }
}
