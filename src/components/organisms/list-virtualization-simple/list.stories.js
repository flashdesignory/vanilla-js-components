import { VirtualList } from "./list.js";
import { data } from "./data.js";

export default {
  title: "Organisms/List",
  argTypes: {
    data: { control: "json" },
    visibleItems: { control: "number" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
    amountRowsBuffered: { action: "number" },
  },
};

const Template = ({ ...args }) => {
  const list = new VirtualList({ ...args });
  return list.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  visibleItems: 3,
  itemHeight: 130,
  itemWidth: 435,
  amountRowsBuffered: 2,
};

// Inspiration
// https://betterprogramming.pub/virtualized-rendering-from-scratch-in-react-34c2ad482b16
// https://medium.com/ingeniouslysimple/building-a-virtualized-list-from-scratch-9225e8bec120
// https://www.patterns.dev/posts/virtual-lists/
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
