import { CheckboxGroup } from "./checkbox-group";
import { data } from "./data";

export default {
  title: "Atoms/Checkbox Group",
  argTypes: {
    name: { control: "text" },
    onChange: { action: "onChange" },
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const cbg = new CheckboxGroup({ ...args });
  return cbg.render();
};

export const Simple = Template.bind({});
Simple.args = {
  name: "animals",
  data: data,
};
