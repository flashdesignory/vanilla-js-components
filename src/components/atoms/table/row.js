export class Row {
  constructor({ data }) {
    this.state = {
      data: undefined, // {[key: string]: string}
    };

    this.tableRow = document.createElement("tr");

    this.update({ data });
  }

  update({ data }) {
    if (data !== undefined) this.state.data = { ...data };
  }

  render() {
    Object.keys(this.state.data).forEach((key) => {
      const cell = document.createElement("td");
      cell.setAttribute("data-attr", key);
      const text = document.createTextNode(this.state.data[key]);
      cell.appendChild(text);
      this.tableRow.appendChild(cell);
    });
    return this.tableRow;
  }
}
