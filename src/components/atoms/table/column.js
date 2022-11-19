export class Column {
  constructor({ data, onClick, sortKey, sortDirection }) {
    this.state = {
      data: [], // string[],
      sortDirection: undefined, // "asc" | "desc"
      sortKey: undefined, // string
    };

    this.tableRow = document.createElement("tr");
    if (onClick) this.tableRow.addEventListener("click", onClick);

    this.update({ data, sortKey, sortDirection });
  }

  update({ data, sortKey, sortDirection }) {
    if (data !== undefined) this.state.data = [...data];
    if (sortKey !== undefined) this.state.sortKey = sortKey;
    if (sortDirection !== undefined) this.state.sortDirection = sortDirection;
  }

  render() {
    console.log(
      "sortKey",
      this.state.sortKey,
      "sortDirection",
      this.state.sortDirection
    );
    this.state.data.forEach((key) => {
      const cell = document.createElement("th");
      if (key === this.state.sortKey) {
        cell.classList.add(`cell-${this.state.sortDirection}`);
      }
      cell.setAttribute("scope", "col");
      cell.textContent = key;
      this.tableRow.appendChild(cell);
    });
    return this.tableRow;
  }
}
