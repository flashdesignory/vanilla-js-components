import { GridHighlighting } from "./grid-highlighting";

export default {
  title: "Misc/GridHighlighting",
  argTypes: {},
};

const Template = ({ ...args }) => {
  const gh = new GridHighlighting({ ...args });
  return gh.render();
};

export const Default = Template.bind({});
Default.args = {};
