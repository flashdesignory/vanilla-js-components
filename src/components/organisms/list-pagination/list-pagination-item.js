export class ListPaginationItem {
  constructor({ role = "listitem", ...data }) {
    this.state = {
      data: undefined, // string
      role: undefined, // "listitem" | "option"
    };

    this.item = document.createElement("li");
    this.item.classList.add("list-li");

    this.update({ data, role });
  }

  update({ role, data }) {
    if (data !== undefined) this.state.data = { ...data };
    if (role !== undefined) this.state.role = role;
  }

  render() {
    this.item.role = this.state.role;

    const id = document.createElement("div");
    id.classList.add("item-id");
    id.textContent = this.state.data.id;
    this.item.appendChild(id);

    const text = document.createElement("div");
    text.classList.add("item-text");
    text.textContent = this.state.data.text;
    this.item.appendChild(text);

    return this.item;
  }
}
