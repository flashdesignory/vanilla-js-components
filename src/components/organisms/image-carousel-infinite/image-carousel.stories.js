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
  const slider = new ImageCarousel({ ...args });
  return slider.render();
};

export const Infinite = Template.bind({});
Infinite.args = {
  data,
  itemWidth: 300,
  itemHeight: 200,
};
