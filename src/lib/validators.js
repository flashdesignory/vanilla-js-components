const EMAIL_REGEXP =
  /* eslint-disable-next-line no-useless-escape */
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;
const ALPHA_NUMBERIC_REGEXP = /^[ L-Np{}]+$/;

export const hasValidName = (value) => {
  return ALPHA_NUMBERIC_REGEXP.test(value);
};

export const hasValidEmail = (value) => {
  return EMAIL_REGEXP.test(value);
};

export const hasValidMin = (value, min) => {
  return value.length >= min;
};

export const hasValidMax = (value, max) => {
  return value.length <= max;
};

export const hasValidRange = (value, min, max) => {
  return value.length >= min && value.length <= max;
};

export const hasValidRequired = (value) => {
  switch (typeof value) {
    case "boolean":
      return value === true;
    default:
      return value.length > 0;
  }
};
