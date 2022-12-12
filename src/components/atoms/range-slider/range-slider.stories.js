import { RangeSlider } from "./range-slider";

export default {
  title: "Atoms/RangeSlider",
  argTypes: {
    id: { control: "text" },
    value: { control: "number" },
    onChange: { action: "onInput" },
  },
};

const Template = ({ ...args }) => {
  const component = new RangeSlider({ ...args });
  return component.render();
};

export const Empty = Template.bind({});
Empty.args = {
  id: "range-slider",
};

export const Half = Template.bind({});
Half.args = {
  id: "range-slider",
  value: 50
}
