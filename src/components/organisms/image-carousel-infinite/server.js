export const getData = async (url, page, limit) => {
  const data = await fetch(url);
  const parsed = await data.json();
  const { items } = parsed;
  const response = {
    total: items.length,
  };

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    response.items = items.slice(startIndex, endIndex);
    return response;
  }

  response.items = [...items];
  return response;
};
