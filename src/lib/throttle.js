export const throttle = (
  fn,
  delay,
  { leading = true, trailing = true } = {}
) => {
  let last = 0;
  let timeout;
  return function (...args) {
    const now = new Date().getTime();
    clearTimeout(timeout);

    if (!leading && last === 0) {
      last = now;
    }

    if (now - last < delay) {
      if (trailing) {
        const difference = now - last;
        const leftOverDelay = delay - difference;
        timeout = setTimeout(() => fn.apply(this, args), leftOverDelay);
      }
      return;
    }

    last = now;
    fn.apply(this, args);
  };
};
