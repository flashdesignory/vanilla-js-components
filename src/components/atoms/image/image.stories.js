import { Image } from "./image";

export default {
  title: "Atoms/Image",
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    fadeIn: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const image = new Image({ ...args });
  return image.render();
};

export const Simple = Template.bind({});
Simple.args = {
  src: "./misc/image-1.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300",
};

export const Animated = Template.bind({});
Animated.args = {
  src: "./misc/image-1.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300",
  fadeIn: true,
};
