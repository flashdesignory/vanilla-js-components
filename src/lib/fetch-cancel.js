const controllers = {};

export const cancellableFetch = async (url, options = {}, hostOnly = false) => {
  const key = hostOnly ? new URL(url).host : url;

  if (controllers[key]) {
    controllers[key].abort();
  }

  controllers[key] = new AbortController();
  const { signal } = controllers[key];
  const response = await fetch(url, { ...options, signal });

  controllers[key] = null;
  return response;
};
