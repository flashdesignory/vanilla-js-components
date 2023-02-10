const cache = {};
const defaultNameSpace = "default";

const expired = (expiresAt) => expiresAt && expiresAt < Date.now();

/**
 * useCache
 * This hook implements an in-memory cache that supports expiration of key/value pairs.
 * The namespace param creates a unique namespaces.
 * 
 * @param {string} namespace
 * @returns Methods to interact with useCache.
 */
export const useCache = (namespace = defaultNameSpace) => {
  if (!cache[namespace]) {
    cache[namespace] = {};
  }

  /**
   * Add a value to the cache.
   * 
   * @param {string} key 
   * @param {*} value 
   * @param {number|undefined} timeout 
   * @returns A key/value pair.
   */
  const setValue = (key, value, timeout) => {
    const expiresAt = timeout ? Date.now() + timeout : null;
    cache[namespace][key] = { value, expiresAt };
    return { key, value };
  };

  /**
   * Deletes a value in the cache.
   * 
   * @param {string} key 
   * @returns A key/value pair.
   */
  const deleteValue = (key) => {
    const value = cache[namespace][key];

    if (value === undefined) return undefined;

    delete cache[namespace][key];
    return { key, value };
  };

  /**
   * Gets a value if found in the cache.
   * 
   * @param {string} key 
   * @returns A key/value pair.
   */
  const getValue = (key) => {
    const { value, expiresAt } = cache[namespace][key] || {};
    if (expired(expiresAt)) {
      deleteValue(key);
      return undefined;
    }

    return { key, value };
  };

  /**
   * Checks if an entry has an expiration.
   * 
   * Null values represent no expiration.
   * Zero (0) represents an expired entry.
   * 
   * @param {string} key 
   * @returns Evaluated expiration
   */
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

  /**
   * Resets cache for namespace.
   */
  const resetCache = () => {
    Object.keys(cache[namespace]).forEach(
      (key) => delete cache[namespace][key]
    );
  };

  /**
   * Getter for the current cache.
   * 
   * @returns Object of the current cache.
   */
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
