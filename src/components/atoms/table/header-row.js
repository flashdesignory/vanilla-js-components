export class HeaderRow {
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
    this.state.data.forEach((key) => {
      const cell = document.createElement("th");
      if (key === this.state.sortKey) {
        cell.classList.add(`cell-${this.state.sortDirection}`);
      }
      cell.setAttribute("scope", "col");
      const title = document.createElement("span");
      title.classList.add("cell-title");
      title.textContent = key;
      cell.appendChild(title);
      const arrow = document.createElement("span");
      arrow.classList.add("cell-arrow");
      cell.appendChild(arrow);
      // cell.textContent = key;
      this.tableRow.appendChild(cell);
    });
    return this.tableRow;
  }
}
