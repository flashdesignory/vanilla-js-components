import { Image } from "./image";

export default {
  title: "Atoms/Image",
  argTypes: {
    src: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    alt: { control: "text" },
    fadeIn: { control: "boolean" },
    lazyLoad: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const component = new Image({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  src: "./misc/image-1.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300",
  style: { width: "300px", height: "300px" },
};

export const Animated = Template.bind({});
Animated.args = {
  src: "./misc/image-1.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300",
  fadeIn: true,
  style: { width: "300px", height: "300px" },
};

export const LazyLoaded = Template.bind({});
LazyLoaded.args = {
  src: "./misc/image-1.jpg",
  alt: "animals on a bus",
  width: "300",
  height: "300",
  fadeIn: true,
  lazyLoad: true,
  style: { width: "300px", height: "300px" },
};
