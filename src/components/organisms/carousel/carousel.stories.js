import { Carousel } from "./carousel";
import { data } from "./data.js";

export default {
  title: "Organisms/Carousel",
  argTypes: {
    data: { control: "json" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
  },
};

const Template = ({ ...args }) => {
  const carousel = new Carousel({ ...args });
  return carousel.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  itemWidth: 300,
  itemHeight: 200,
};
