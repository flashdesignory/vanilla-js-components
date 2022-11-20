export const EyeOnIcon = ({
  width = "24",
  height = "24",
  fill = "#000000",
} = {}) =>
  `<svg
    viewBox="0 0 24 24"
    height="${height}"
    width="${width}"
    fill="${fill}"
  >
    <title>eye on icon</title>
    <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="${fill}" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5c7.385 0 10 7 10 7s-2.615 7-10 7-10-7-10-7 2.615-7 10-7zm0 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      fill="${fill}"
    />
  </svg>`;
