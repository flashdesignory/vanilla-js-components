export const Fullscreen = ({ width = "1em", height = "1em" } = {}) =>
  `<svg
    width="${width}"
    height="${height}"
    style="vertical-align: middle;fill: currentColor;overflow: hidden;"
    viewBox="0 0 1024 1024"
  >
    <title>fullscreen</title>
    <path d="M213.333 213.333h213.334v85.334h-128v128h-85.334V213.333m384 0h213.334v213.334h-85.334v-128h-128v-85.334m128 384h85.334v213.334H597.333v-85.334h128v-128m-298.666 128v85.334H213.333V597.333h85.334v128h128z" />
  </svg>`;
