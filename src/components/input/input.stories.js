import { Input } from "./input";

export default {
  title: "Components/Input",
  argTypes: {
    id: { control: "text" },
    type: { control: "text" },
    placeholder: { control: "text" },
    onInput: { action: "onInput" },
  },
};

const Template = ({ ...args }) => {
  const input = new Input({ ...args });
  return input.render();
};

export const Text = Template.bind({});
Text.args = {
  id: "input",
  type: "text",
  placeholder: "Enter something",
};
