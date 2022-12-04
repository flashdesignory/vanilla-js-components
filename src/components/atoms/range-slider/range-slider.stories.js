import { RangeSlider } from "./range-slider";

export default {
  title: "Atoms/RangeSlider",
  argTypes: {
    id: { control: "text" },
    value: { control: "number" },
  },
};

const Template = ({ ...args }) => {
  const component = new RangeSlider({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "range-slider",
};
