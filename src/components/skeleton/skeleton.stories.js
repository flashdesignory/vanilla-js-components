import { Skeleton } from "./skeleton";

export default {
  title: "Components/Skeleton",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const skeleton = new Skeleton({ ...args });
  return skeleton.render();
};

export const Simple = Template.bind({});
Simple.args = {};