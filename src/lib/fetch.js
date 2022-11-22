const controllers = {};

export const fetchRequest = async (
  url,
  options = {
    hostOnly: false,
  }
) => {
  const key = options.hostOnly ? new URL(url).host : url;

  if (controllers[key]) {
    controllers[key].abort();
  }

  controllers[key] = new AbortController();
  const { signal } = controllers[key];

  const response = await fetch(url, { signal });

  controllers[key] = null;
  return response;
};
