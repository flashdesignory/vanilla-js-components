const gcd = (a, b) => (b ? gcd(b, a % b) : a);

export const getAspectRatio = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

export const getAspectRatioForStyles = (width, height) => {
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

export const getNewWidth = (width, height, targetHeight) =>
  (width / height) * targetHeight;

export const getNewHeight = (width, height, targetWidth) =>
  (height / width) * targetWidth;
