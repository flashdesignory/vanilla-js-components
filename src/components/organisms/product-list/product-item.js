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

    // this.item.textContent = this.state.data.name;
    this.item.role = this.state.role;

    const name = document.createElement("div");
    name.classList.add("item-name");
    name.textContent = this.state.data.name;
    this.item.appendChild(name);

    const price = document.createElement("div");
    price.classList.add("item-price");
    price.textContent = this.state.data.price;
    this.item.appendChild(price);

    return this.item;
  }
}
