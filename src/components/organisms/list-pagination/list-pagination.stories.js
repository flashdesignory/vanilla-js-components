import { ListPagination } from "./list-pagination";
import { getData } from "./server.js";

export default {
  title: "Organisms/PaginationList",
  argTypes: {
    data: { control: "json" },
  },
};

let url = "./data/quotes.json";

let list = null;
let state = {
  page: 0,
  limit: 10,
  totalItems: 0,
};

const requestMore = async () => {
  if (state.page * state.limit < state.totalItems || state.totalItems === 0) {
    state.page++;
    const data = await getData(url, state.page, state.limit);
    state.totalItems = data.total;
    list.update({
      data: data.items,
      totalPages: Math.ceil(data.total / state.limit),
      activePage: state.page,
    });
    list.rebuild();
    list.render();
  }
};

const requestPage = async (page) => {
  state.page = page;
  const data = await getData(url, state.page, state.limit);
  state.totalItems = data.total;
  list.update({
    data: data.items,
    totalPages: Math.ceil(data.total / state.limit),
    activePage: state.page,
  });
  list.rebuild();
  list.render();
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 10,
    totalItems: 0,
  };
  list = new ListPagination({ ...args });
  requestMore();
  return list.render();
};

export const Simple = Template.bind({});
Simple.args = {
  requestPage: requestPage,
};
