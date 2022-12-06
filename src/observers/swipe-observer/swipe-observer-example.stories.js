import { SwipeObserverExample } from "./swipe-observer-example";

export default {
  title: "Observers/SwipeObserver",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new SwipeObserverExample({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  title: "Swipe Observer Example",
  description: `
    Swipe on touch-enabled devices, or mousedown + mousemove on other devices.
  `,
};
