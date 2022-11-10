import { AutoComplete } from "./autocomplete.js";
import { data } from "./data.js";

export default {
  title: "Organisms/AutoComplete",
  argTypes: {
    data: { control: "array" },
    title: { control: "text" },
    errorText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const ac = new AutoComplete({ ...args });
  return ac.render();
};

export const Static = Template.bind({});
Static.args = {
  data: data,
  title: "Country Search",
  errorText: "No results - try another search!",
};
