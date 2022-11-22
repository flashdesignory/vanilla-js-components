export const retryableFetch = async (url, options = {}, retries = 3) => {
  const response = await fetch(url, options);

  if (response.ok) {
    return response;
  }

  if (retries > 0) {
    return retryableFetch(url, options, retries - 1);
  }

  throw new Error(response.status);
};
