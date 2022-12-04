import { Pagination } from "./pagination";

export default {
  title: "Atoms/Pagination",
  argTypes: {
    buttonWidth: { control: "number" },
    containerWidth: { controls: "number" },
    onClick: { action: "onClick" },
  },
};

const Template = ({ ...args }) => {
  const component = new Pagination({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  buttonWidth: 30,
  containerWidth: 400,
  totalItems: 11,
  activeItem: 1,
};

export const Tiny = Template.bind({});
Tiny.args = {
  buttonWidth: 30,
  containerWidth: 400,
  totalItems: 2,
  activeItem: 1,
};

export const DotsRight = Template.bind({});
DotsRight.args = {
  buttonWidth: 30,
  containerWidth: 400,
  totalItems: 13,
  activeItem: 4,
};

export const DotsLeft = Template.bind({});
DotsLeft.args = {
  buttonWidth: 30,
  containerWidth: 400,
  totalItems: 13,
  activeItem: 10,
};

export const TwoDots = Template.bind({});
TwoDots.args = {
  buttonWidth: 30,
  containerWidth: 400,
  totalItems: 13,
  activeItem: 7,
};
