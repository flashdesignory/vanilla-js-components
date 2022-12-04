import { Table } from "./table.js";
import { data } from "./data.js";

export default {
  title: "Atoms/Table",
  argTypes: {
    data: { control: "array" },
    emptyTableText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new Table({ ...args });
  return component.render();
};

export const WithData = Template.bind({});
WithData.args = {
  data: data,
  title: "States & Capitals",
};

export const WithoutData = Template.bind({});
WithoutData.args = {
  emptyTableText: "No items to display!",
};
