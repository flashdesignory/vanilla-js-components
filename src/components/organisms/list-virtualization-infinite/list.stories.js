import { InfiniteList } from "./list.js";
import { getData } from "./server.js";

export default {
  title: "Organisms/List",
  argTypes: {
    data: { control: "json" },
    visibleItems: { control: "number" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
    amountRowsBuffered: { action: "number" },
    onLastItem: { action: "onClick" },
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
  console.log("request more ...");
  if (state.page * state.limit < state.totalItems || state.totalItems === 0) {
    state.page++;
    const data = await getData(url, state.page, state.limit);
    state.totalItems = data.total;
    list.update({ data });
    list.handleOnScroll();
  }
};

const Template = ({ ...args }) => {
  state = {
    page: 0,
    limit: 10,
    totalItems: 0,
  };
  list = new InfiniteList({ ...args });
  requestMore();
  return list.render();
};

export const Infinite = Template.bind({});
Infinite.args = {
  // data: [],
  visibleItems: 3,
  itemHeight: 130,
  itemWidth: 435,
  amountRowsBuffered: 2,
  onLastItem: requestMore,
};

// Inspiration
// https://betterprogramming.pub/virtualized-rendering-from-scratch-in-react-34c2ad482b16
// https://medium.com/ingeniouslysimple/building-a-virtualized-list-from-scratch-9225e8bec120
// https://www.patterns.dev/posts/virtual-lists/
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
