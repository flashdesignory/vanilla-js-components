import { UseStoreExample } from "./use-store-example";
import { BaseComponent } from "./base-component";

export default {
  title: "Hooks/UseStoreExample",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    namespace: { control: "text" }
  },
};

const Template = ({ ...args }) => {
  const container = document.createElement("div");
  container.classList.add("template-container");

  const component = new UseStoreExample({ ...args });
  container.appendChild(component.render());

  const base = new BaseComponent({ namespace: args.namespace });
  container.appendChild(base.render());
  return container;
};

export const Example = Template.bind({});
Example.args = {
  title: "UseStore Example",
  description: `Global store with namespace!`,
  namespace: "example"
};
