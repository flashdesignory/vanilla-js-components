import { DynamicList } from "./list.js";
import { data } from "./data.js";

export default {
  title: "Molecules/List",
  argTypes: {
    data: { control: "json" },
    displayHeight: { control: "number" },
    displayWidth: { control: "number" },
  },
};

const Template = ({ ...args }) => {
  const list = new DynamicList({ ...args });
  return list.render();
};

export const Dynamic = Template.bind({});
Dynamic.args = {
  data,
  displayHeight: 390,
  displayWidth: 435,
};

// Inspiration
// https://betterprogramming.pub/virtualized-rendering-from-scratch-in-react-34c2ad482b16
// https://medium.com/ingeniouslysimple/building-a-virtualized-list-from-scratch-9225e8bec120
// https://www.patterns.dev/posts/virtual-lists/
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
