import { Avatar } from "./avatar";

export default {
  title: "Atoms/Avatar",
  argTypes: {
    image: {
      src: { control: "text" },
    },
  },
};

const Template = ({ ...args }) => {
  const avatar = new Avatar({ ...args });
  return avatar.render();
};

export const Simple = Template.bind({});
Simple.args = {};

export const Image = Template.bind({});
Image.args = {
  image: {
    src: "./misc/image-1.jpg",
    width: "80",
    height: "80",
  },
};
