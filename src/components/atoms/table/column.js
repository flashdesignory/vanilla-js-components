export class Column {
  constructor({ data }) {
    this.state = {
      data: [], // string[]
    };

    this.tableRow = document.createElement("tr");

    this.update({ data });
  }

  update({ data }) {
    if (data !== undefined) this.state.data = [ ...data ];
  }

  render() {
    this.state.data.forEach(key => {
      const cell = document.createElement("th");
      cell.setAttribute("scope", "col");
      cell.textContent = key;
      this.tableRow.appendChild(cell);
    });
    return this.tableRow;
  }
}
