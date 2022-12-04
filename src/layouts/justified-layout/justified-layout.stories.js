import { JustifiedLayout } from "./justified-layout";
import { data } from "./data.js";

export default {
  title: "Layouts/JustifiedLayout",
  argTypes: {
    maxHeight: { control: "number" },
    data: { control: "json" },
  },
};

const Template = ({ ...args }) => {
  const component = new JustifiedLayout({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  maxHeight: 300,
  data,
};
