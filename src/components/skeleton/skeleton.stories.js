import { Skeleton } from "./skeleton";

export default {
  title: "Components/Skeleton",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const skeleton = new Skeleton({ ...args });
  return skeleton.render();
};

export const Circle = Template.bind({});
Circle.args = {
    avatarShape: "circle"
};

export const Square = Template.bind({});
Square.args = {
    avatarShape: "square"
};