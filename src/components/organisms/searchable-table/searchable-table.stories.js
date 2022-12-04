import { SearchableTable } from "./searchable-table";
import { data } from "./data.js";

export default {
  title: "Organisms/SearchableTable",
  argTypes: {
    data: { control: "json" },
    title: { control: "text" },
    errorText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new SearchableTable({ ...args });
  return component.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Searchable Table",
  errorText: "No data!",
};
