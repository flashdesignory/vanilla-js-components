import { GridHighlighting } from "./grid-highlighting";

export default {
  title: "Misc/GridHighlighting",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const component = new GridHighlighting({ ...args });
  return component.render();
};

export const Default = Template.bind({});
Default.args = {};
