import { ImageCarousel } from "./image-carousel";
import { data } from "./data.js";

export default {
  title: "Organisms/ImageCarousel",
  argTypes: {
    data: { control: "json" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
  },
};

const Template = ({ ...args }) => {
  const component = new ImageCarousel({ ...args });
  return component.render();
};

export const Loop = Template.bind({});
Loop.args = {
  data,
  itemWidth: 300,
  itemHeight: 200,
};
