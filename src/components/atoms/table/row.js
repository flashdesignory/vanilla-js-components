export class Row {
  constructor({ data, onClick }) {
    this.state = {
      data: undefined, // {[key: string]: string}
    };

    this.tableRow = document.createElement("tr");
    if (onClick) this.tableRow.addEventListener("click", onClick);

    this.update({ data });
  }

  update({ data }) {
    if (data !== undefined) this.state.data = { ...data };
  }

  render() {
    Object.keys(this.state.data).forEach((key) => {
      const cell = document.createElement("td");
      cell.setAttribute("data-attr", key);
      cell.textContent = this.state.data[key];
      this.tableRow.appendChild(cell);
    });
    return this.tableRow;
  }
}
