import { ImageSlider } from "./image-slider";
import { getData } from "./server.js";

export default {
  title: "Organisms/ImageSlider",
  argTypes: {
    data: { control: "json" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
    onLastItem: { action: "onClick" },
  },
};

let url = "./data/surf-landscape.json";

let slider = null;
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
    slider.update({ data: data.items });
    slider.rebuild();
    slider.render();
  }
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 6,
    totalItems: 0,
  };
  slider = new ImageSlider({ ...args });
  requestMore();
  return slider.container;
};

export const Infinite = Template.bind({});
Infinite.args = {
  itemWidth: 300,
  itemHeight: 200,
  onLastItem: requestMore
};
