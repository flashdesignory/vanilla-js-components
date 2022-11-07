import { StarRating } from "./star-rating";

export default {
  title: "Misc/StarRating",
  argTypes: {
    onChange: { action: "onChange" },
  },
};

const Template = ({ ...args }) => {
  const sr = new StarRating({ ...args });
  return sr.render();
};

export const Simple = Template.bind({});
Simple.args = {};
