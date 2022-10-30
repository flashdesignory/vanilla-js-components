export const getData = async (url, page, limit) => {
  const data = await fetch(url);
  const parsed = await data.json();
  const { quotes } = parsed;
  const response = {
    total: quotes.length,
  };

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    response.items = quotes.slice(startIndex, endIndex);
    return response;
  }

  response.items = [...quotes];
  return response;
}
