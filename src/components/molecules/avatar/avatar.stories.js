import { Avatar } from "./avatar";

export default {
  title: "Molecules/Avatar",
  argTypes: {
    image: {
      src: { control: "text" },
    },
  },
};

const Template = ({ ...args }) => {
  const component = new Avatar({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {};

export const Image = Template.bind({});
Image.args = {
  image: {
    src: "./misc/image-1.jpg",
    width: "80",
    height: "80",
    alt: "animals on a bus",
  },
};
