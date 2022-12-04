import { StarRating } from "./star-rating";

export default {
  title: "Misc/StarRating",
  argTypes: {
    onChange: { action: "onChange" },
  },
};

const Template = ({ ...args }) => {
  const component = new StarRating({ ...args });
  return component.render();
};

export const EmptyRating = Template.bind({});
EmptyRating.args = {};

export const SetRating = Template.bind({});
SetRating.args = {
  currentRating: 3,
};

export const DisabledRating = Template.bind({});
DisabledRating.args = {
  currentRating: 2,
  disabled: true,
};
