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

let carousel = null;
let state = {
  page: 0,
  limit: 6,
  totalItems: 0,
};

const requestMore = async () => {
  console.log("request more ...");
  if (state.page * state.limit < state.totalItems || state.totalItems === 0) {
    state.page++;
    const data = await getData(url, state.page, state.limit);
    state.totalItems = data.total;
    carousel.update({ data: data.items });
    carousel.rebuild();
    carousel.render();
  }
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 6,
    totalItems: 0,
  };
  carousel = new ImageCarousel({ ...args });
  requestMore();
  return carousel.container;
};

export const Infinite = Template.bind({});
Infinite.args = {
  itemWidth: 300,
  itemHeight: 200,
  onLastItem: requestMore
};
