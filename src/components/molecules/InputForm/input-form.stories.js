import { InputForm } from "./input-form";

export default {
  title: "Molecules/InputForm",
  argTypes: {
    id: { control: "text" },
    placeholder: { control: "text" },
    submitText: { control: "text" },
    onSubmit: { action: "onSubmit" },
  },
};

const Template = ({ ...args }) => {
  const inputForm = new InputForm({ ...args });
  return inputForm.render();
};

export const TextInputForm = Template.bind({});
TextInputForm.args = {};
