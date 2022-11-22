import { RangeSlider } from "./range-slider";

export default {
  title: "Atoms/RangeSlider",
  argTypes: {
    id: { control: "text" },
    value: { control: "number" },
  },
};

const Template = ({ ...args }) => {
  const rs = new RangeSlider({ ...args });
  return rs.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "range-slider",
};
