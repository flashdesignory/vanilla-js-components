import { DisplayMonth } from "./month";

export default {
  title: "Molecules/Calendar",
  argTypes: {
    actualDate: { control: "date" },
    onClick: { action: "onClick" },
  },
};

const Template = ({ ...args }) => {
  const dm = new DisplayMonth({ ...args });
  return dm.render();
};

export const Month = Template.bind({});
Month.args = {
  actualDate: new Date(),
};
