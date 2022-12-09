import { MultiInputForm } from "./multi-input-form";

export default {
  title: "Molecules/MultiInputForm",
  argTypes: {
    id: { control: "text" },
    submitText: { control: "text" },
    onSubmit: { action: "onSubmit" },
    data: { control: "array" },
  },
};

const Template = ({ ...args }) => {
  const component = new MultiInputForm({ ...args });
  return component.render();
};

export const TextInputForm = Template.bind({});
TextInputForm.args = {
  data: [
    {
      id: "email",
      type: "text",
      placeholder: "Enter Email",
    },
    {
      id: "password",
      type: "text",
      placeholder: "Enter Password",
    },
  ],
  submitText: "submit",
};
