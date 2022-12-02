import { Masonry } from "./masonry";
import { getData } from "./server.js";

export default {
  title: "Layouts/Masonry",
  argTypes: {
    numColumns: { control: "number" },
    data: { control: "json" },
    onLastItem: { action: "onClick" },
  },
};

let url = "./data/surf.json";

let component = null;
let state = {};

const requestMore = async () => {
  console.log("request more ...");
  if (state.page * state.limit < state.totalItems || state.totalItems === 0) {
    state.page++;
    const data = await getData(url, state.page, state.limit);
    state.totalItems = data.total;
    component.update({ data: data.items });
    component.rebuild();
    component.render();
  }
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 10,
    totalItems: 0,
  };
  component = new Masonry({ ...args });
  requestMore();
  return component.container;
};

export const Infinite = Template.bind({});
Infinite.args = {
  numColumns: 3,
  onLastItem: requestMore,
};
