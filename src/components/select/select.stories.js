import { Select } from "./select";
import { data } from "./data";

export default {
  title: "Components/Select",
  argTypes: {
    id: { control: "text" },
    multiple: { control: "boolean" },
    onChange: { action: "onChange" },
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const select = new Select({ ...args });
  return select.render();
};

export const Simple = Template.bind({});
Simple.args = {
  id: "select",
  multiple: false,
  data: data,
};
