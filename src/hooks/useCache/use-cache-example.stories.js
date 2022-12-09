import { UseCacheExample } from "./use-cache-example";

export default {
  title: "Hooks/UseCacheExample",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new UseCacheExample({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  title: "UseCache Example",
  description: `Caching with expiration... try it!`,
};
