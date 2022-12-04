import { Loader } from "./loader";

export default {
  title: "Misc/Loader",
  argTypes: {
    size: { control: "number" },
  },
};

const Template = ({ ...args }) => {
  const component = new Loader({ ...args });
  return component.render();
};

export const Large = Template.bind({});
Large.args = {
  size: 120,
};

export const Small = Template.bind({});
Small.args = {
  size: 20,
};
