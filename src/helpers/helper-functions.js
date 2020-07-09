export const defaultPageSize = 3;

export const paginate = (size = defaultPageSize, page = 0, elements = []) => {
  // size: total elements on a page
  // page: current active page

  const startIndex = page * size;
  const finalIndex = startIndex + size;

  return elements.slice(startIndex, finalIndex);
};

export const getQueryParams = (queryString) => {
  const queryParams = queryString;
  let params = queryParams.substr(1).split("&");

  params = params.reduce((object, param) => {
    const [key, value] = param.split("=");
    object[key] = value;
    return object;
  }, {});

  return params;
};