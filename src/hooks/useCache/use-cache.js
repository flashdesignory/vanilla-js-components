const cache = {};
const defaultNameSpace = "default";

const expired = (expiresAt) => expiresAt && expiresAt < Date.now();

export const useCache = (namespace = defaultNameSpace) => {
  if (!cache[namespace]) {
    cache[namespace] = {};
  }

  const setValue = (key, value, timeout) => {
    const expiresAt = timeout ? Date.now() + timeout : null;
    cache[namespace][key] = { value, expiresAt };
    return { key, value };
  };

  const deleteValue = (key) => {
    const value = cache[namespace][key];

    if (value === undefined) return undefined;

    delete cache[namespace][key];
    return { key, value };
  };

  const getValue = (key) => {
    const { value, expiresAt } = cache[namespace][key] || {};
    if (expired(expiresAt)) {
      deleteValue(key);
      return undefined;
    }

    return { key, value };
  };

  const timeTillExpiration = (key) => {
    const { expiresAt } = cache[namespace][key] || {};

    if (!expiresAt) {
      return null;
    }

    if (expired(expiresAt)) {
      return 0;
    }

    return expiresAt - Date.now();
  };

  const resetCache = () => {
    Object.keys(cache[namespace]).forEach(
      (key) => delete cache[namespace][key]
    );
  };

  const getCache = () => ({ ...cache[namespace] });

  return {
    getValue,
    setValue,
    deleteValue,
    resetCache,
    getCache,
    timeTillExpiration,
  };
};
