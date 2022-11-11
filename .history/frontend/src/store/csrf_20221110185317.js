import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the 'Content-Type' header to
  // 'application/json', and set the 'XSRF-TOKEN' header to the value of the
  // 'XSRF-TOKEN' cookie

  if (options.method.toUpperCase() ! == 'GET') {
    options
  }
}
