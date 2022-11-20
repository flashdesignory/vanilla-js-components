import { EyeOnIcon } from "./eye-on";
import { EyeOffIcon } from "./eye-off";

export const EyeToggle = ({
  width = "24",
  height = "24",
  fill = "#000000",
  on = false,
} = {}) => {
  if (on) return EyeOnIcon({ width, height, fill });
  return EyeOffIcon({ width, height, fill });
};
