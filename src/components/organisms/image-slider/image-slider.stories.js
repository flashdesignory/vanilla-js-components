import { ImageSlider } from "./image-slider";
import { data } from "./data.js";

export default {
  title: "Organisms/ImageSlider",
  argTypes: {
    data: { control: "json" },
    itemHeight: { control: "number" },
    itemWidth: { action: "number" },
  },
};

const Template = ({ ...args }) => {
  const component = new ImageSlider({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  itemWidth: 300,
  itemHeight: 200,
};
