import { ProductTable } from "./product-table";
import { data } from "./data.js";

export default {
  title: "Organisms/ProductTable",
  argTypes: {
    data: { control: "json" },
    title: { control: "text" },
    errorText: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const pt = new ProductTable({ ...args });
  return pt.render();
};

export const Simple = Template.bind({});
Simple.args = {
  data,
  title: "Product Table",
  errorText: "No products!",
};
