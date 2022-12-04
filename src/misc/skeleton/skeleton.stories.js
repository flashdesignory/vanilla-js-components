import { Skeleton } from "./skeleton";

export default {
  title: "Misc/Skeleton",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const component = new Skeleton({ ...args });
  return component.render();
};

export const Circle = Template.bind({});
Circle.args = {
  avatarShape: "circle",
};

export const Square = Template.bind({});
Square.args = {
  avatarShape: "square",
};
