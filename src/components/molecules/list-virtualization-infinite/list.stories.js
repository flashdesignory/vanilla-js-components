import { InfiniteList } from './list.js';
import { getData } from './server.js';

export default {
  title: "Molecules/List",
  argTypes: {
    data: { control: "json" },
    visibleItems: { control: "number" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
    amountRowsBuffered: { action: "number" },
    onLastItem: { action: "onClick" },
  },
};

let url = './data/quotes.json';

let list = null;
let state = {
  page: 1,
  limit: 10,
  totalItems: 0
}

const fetchData = async (page, limit) => {
  return await getData(url, page, limit);
};

const requestMore = async () => {
  console.log('request more ...');
  if (state.page * state.limit < state.totalItems) {
    state.page++;
    const data = await fetchData(state.page, state.limit);
    state.totalItems = data.total;
    list.updateData(data);
    list.handleOnScroll();
  }
};

const init = async() => {
  const data = await fetchData(state.page, state.limit);
  state.totalItems = data.total;
  list.updateData(data);
  list.handleOnScroll();
}

const Template = ({ ...args }) => {
  list = new InfiniteList({ ...args });
  init();
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
