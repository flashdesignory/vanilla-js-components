import { Progress } from "./progress";

export default {
  title: "Atoms/Progress",
  argTypes: {
    percentage: { control: "number" },
    active: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const component = new Progress({ ...args });
  return component.render();
};

export const Empty = Template.bind({});
Empty.args = {
  percentage: 0,
};

export const Half = Template.bind({});
Half.args = {
  percentage: 50,
};
