import { List } from "./list.js";
import { data } from "./data.js";

const ref = document.getElementById("app");
new List({ ref, data, displayHeight: 240 }).render();
