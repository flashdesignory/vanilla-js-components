import { EventsObserverExample } from "./events-observer-example";

export default {
  title: "Observers/EventsObserver",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new EventsObserverExample({ ...args });
  return component.render();
};

export const Example = Template.bind({});
Example.args = {
  title: "Events Observer Example",
  description: `
    Uses Mutation Observer to add and remove events, depending on if the element is added to the droppable area or not.
    Drag and drop boxes into droppable area below to activate / deactivate.
  `,
};
