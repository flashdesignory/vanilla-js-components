import { ImageCarousel } from "./image-carousel";
import { getData } from "./server.js";

export default {
  title: "Organisms/ImageCarousel",
  argTypes: {
    data: { control: "json" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
    onLastItem: { action: "onClick" },
  },
};

let url = "./data/surf-landscape.json";

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
    limit: 6,
    totalItems: 0,
  };
  component = new ImageCarousel({ ...args });
  requestMore();
  return component.container;
};

export const Infinite = Template.bind({});
Infinite.args = {
  itemWidth: 300,
  itemHeight: 200,
  onLastItem: requestMore
};
