export const parseQueryString = (queryString='') =>
  queryString.replace(/^\?/, '')
    .split('&')
    .reduce((acc, pair) => {
      const [name, value] = pair.split('=');
      if (value === undefined) {
        return acc;
      }
      return { ...acc, [name]: decodeURIComponent(value) }
    }, {});
