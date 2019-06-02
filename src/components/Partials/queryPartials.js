var getQueryString = () => window.location.search === '' ? {} : JSON.parse('{"'+ window.location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') +'"}')

export { getQueryString }