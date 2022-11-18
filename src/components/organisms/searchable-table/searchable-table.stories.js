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
  const st = new SearchableTable({ ...args });
  return st.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Searchable Table",
  errorText: "No data!",
};
