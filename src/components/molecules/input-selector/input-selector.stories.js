import { InputSelector } from "./input-selector";
import { data } from "./data.js";

export default {
  title: "Molecules/InputSelector",
  argTypes: {
    data: { control: "array" },
    onChange: { action: "onChange" },
    placeholder: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new InputSelector({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data: data,
  placeholder: "Select Day",
};
