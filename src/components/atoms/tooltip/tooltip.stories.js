import { Tooltip } from "./tooltip";

export default {
  title: "Atoms/Tooltip",
  argTypes: {
    direction: { control: "text" },
    id: { control: "text" },
    label: { control: "text" },
    type: { control: "text" },
    content: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const style = {
    marginLeft: "50%",
    marginTop: "40px",
    transform: "translateX(-50%)",
  };
  const tooltip = new Tooltip({ ...args, style });
  return tooltip.render();
};

export const TextTop = Template.bind({});
TextTop.args = {
  direction: "top",
  id: "one",
  label: "more info",
  type: "text",
  content: "Here is some more information!",
};

export const TextLeft = Template.bind({});
TextLeft.args = {
  direction: "left",
  id: "one",
  label: "more info",
  type: "text",
  content: "Here is some more information!",
};

export const TextRight = Template.bind({});
TextRight.args = {
  direction: "right",
  id: "one",
  label: "more info",
  type: "text",
  content: "Here is some more information!",
};

export const TextBottom = Template.bind({});
TextBottom.args = {
  direction: "bottom",
  id: "one",
  label: "more info",
  type: "text",
  content: "Here is some more information!",
};

export const IconTop = Template.bind({});
IconTop.args = {
  direction: "top",
  id: "one",
  label: "🦊",
  type: "icon",
  content: "Here is some more information!",
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  direction: "left",
  id: "one",
  label: "🦊",
  type: "icon",
  content: "Here is some more information!",
};

export const IconRight = Template.bind({});
IconRight.args = {
  direction: "right",
  id: "one",
  label: "🦊",
  type: "icon",
  content: "Here is some more information!",
};

export const IconBottom = Template.bind({});
IconBottom.args = {
  direction: "bottom",
  id: "one",
  label: "🦊",
  type: "icon",
  content: "Here is some more information!",
};
