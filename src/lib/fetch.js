const controllers = {};

export const fetchRequest = async (url) => {
  if (controllers[url]) {
    controllers[url].abort();
  }

  controllers[url] = new AbortController();
  const { signal } = controllers[url];

  const response = await fetch(url, { signal });

  controllers[url] = null;
  return response;
};
