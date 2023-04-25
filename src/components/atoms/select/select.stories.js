import { Select } from "./select";
import { data } from "./data";

export default {
  title: "Atoms/Select",
  argTypes: {
    id: { control: "text" },
    multiple: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "onChange" },
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const component = new Select({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "select",
  multiple: false,
  data: data,
  label: "Select a car!"
};
