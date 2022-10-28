import { Image } from "./image";

export default {
  title: "Atoms/Image",
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const image = new Image({ ...args });
  return image.render();
};

export const Simple = Template.bind({});
Simple.args = {
  src: "./image_01.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300"
};