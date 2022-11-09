import { List } from "./list.js";
import { data } from "./data.js";

export default {
  title: "Atoms/List",
  argTypes: {
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const list = new List({ ...args });
  return list.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data: data,
};
