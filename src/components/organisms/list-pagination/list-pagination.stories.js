import { ListPagination } from "./list-pagination";
import { getData } from "./server.js";

export default {
  title: "Organisms/PaginationList",
  argTypes: {
    data: { control: "json" },
  },
};

let url = "./data/quotes.json";

let component = null;
let state = {};

const requestPage = async (page) => {
  console.log("request Page()")
  state.page = page;
  const data = await getData(url, state.page, state.limit);
  state.totalItems = data.total;
  component.update({
    data: data.items,
    totalPages: Math.ceil(data.total / state.limit),
    activePage: state.page,
  });
  component.rebuild();
  component.render();
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 10,
    totalItems: 0,
  };
  component = new ListPagination({ ...args });
  requestPage(1);
  return component.container;
};

export const Simple = Template.bind({});
Simple.args = {
  requestPage: requestPage,
};
