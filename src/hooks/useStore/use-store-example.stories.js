import { UseStoreExample } from "./use-store-example";

export default {
  title: "Hooks/UseStoreExample",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new UseStoreExample({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  title: "UseStore Example",
  description: `Global store with namespace!`,
};
