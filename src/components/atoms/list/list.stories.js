import { List } from "./list.js";
import { data } from "./data.js";

export default {
  title: "Atoms/List",
  argTypes: {
    data: { control: "array" },
    insertMethod: { control: "text" },
    onClick: { action: "onClick" },
    emptyListText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const list = new List({ ...args });
  return list.render();
};

export const WithData = Template.bind({});
WithData.args = {
  data: data,
};

export const WithoutData = Template.bind({});
WithoutData.args = {
  emptyListText: "No items to display!",
};
