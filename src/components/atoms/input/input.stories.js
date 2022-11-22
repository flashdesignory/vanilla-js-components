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

export const TextInput = Template.bind({});
TextInput.args = {
  id: "input",
  type: "text",
  label: "Enter some text:",
  placeholder: "Enter something",
};

export const SearchInput = Template.bind({});
SearchInput.args = {
  id: "controlled-input",
  type: "search",
  label: "Enter some text",
  hideLabel: true,
};

export const DateInput = Template.bind({});
DateInput.args = {
  id: "input",
  type: "date",
  label: "Enter a date",
  hideLabel: true,
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  id: "input",
  type: "password",
  label: "Enter password",
  hideLabel: true,
};

export const InputWithValue = Template.bind({});
InputWithValue.args = {
  id: "controlled-input",
  type: "text",
  label: "Enter some text",
  hideLabel: true,
  value: "Initial Value",
};
