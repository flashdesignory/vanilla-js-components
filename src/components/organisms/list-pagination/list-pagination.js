// import sheet from './list-pagination.css' assert { type: 'css' };
// document.adoptedStyleSheets.push(sheet);
import "./list-pagination.css";

import { List } from "../../atoms/list/list.js";
import { Pagination } from "../../atoms/pagination/pagination.js";
import { ListPaginationItem } from "./list-pagination-item.js";
// import { DisplayCard } from "../../molecules/display-card/display-card";

export class ListPagination {
  constructor({ data, totalPages, activePage, requestPage }) {
    this.state = {
      data: [], // {id: string, text: string, metadata: string, avatar: string }[],
      totalPages: 0, // number
      activePage: undefined, // number
    };

    this.requestPage = requestPage;
    this.isFetching = false;

    this.handleOnClick = this.handleOnClick.bind(this);

    this.container = document.createElement("div");
    this.container.classList.add("list-pagination");

    this.list = new List({
      title: "content list",
      role: "list",
      ItemClass: ListPaginationItem,
      // ItemClass: DisplayCard
    });
    this.container.appendChild(this.list.render());

    this.pagination = new Pagination({
      onClick: this.handleOnClick,
      containerWidth: 400,
      buttonWidth: 30,
    });
    this.container.appendChild(this.pagination.render());

    this.update({ data, totalPages, activePage });
    if (data && data.length > 0) {
      this.rebuild();
    }
  }

  update({ data, totalPages, activePage }) {
    if (data !== undefined) {
      this.state.data = [...data];
      this.list.update({ data: this.state.data });
    }

    if (totalPages !== undefined) this.state.totalPages = totalPages;
    if (activePage !== undefined) this.state.activePage = activePage;

    this.pagination.update({ totalItems: totalPages, activeItem: activePage });

    this.isFetching = false;
  }

  rebuild() {
    this.list.rebuild();
    this.pagination.rebuild();
  }

  handleOnClick(id) {
    if (this.requestPage) {
      this.isFetching = true;
      this.requestPage(id);
    }
  }

  render() {
    this.list.render();
    this.pagination.render();
    return this.container;
  }
}
