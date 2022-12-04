import { Masonry } from "./masonry";
import { data } from "./data.js";

export default {
  title: "Layouts/Masonry",
  argTypes: {
    numColumns: { control: "number" },
    data: { control: "json" },
  },
};

const Template = ({ ...args }) => {
  const component = new Masonry({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  numColumns: 3,
  data,
};
