import { Input } from "./input";

export default {
  title: "Atoms/Input",
  argTypes: {
    id: { control: "text" },
    type: { control: "text" },
    placeholder: { control: "text" },
    label: { control: "text" },
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
  label: "Enter some text:",
  placeholder: "Enter something",
};

export const TextWithValue = Template.bind({});
TextWithValue.args = {
  id: "controlled-input",
  type: "text",
  label: "Enter some text",
  hideLabel: true,
  value: "Initial Value",
};
