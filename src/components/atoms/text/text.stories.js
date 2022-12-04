import { Text } from "./text";

export default {
  title: "Atoms/Text",
  argTypes: {
    text: { control: "text" },
    truncate: { control: "boolean" },
  },
};

const Template = ({ ...args }) => {
  const component = new Text({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  text: "Hello world!",
};
