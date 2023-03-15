/**
 * A generic error handler
 *
 * @param { number } status Status code
 * @param { string } statusText Status text
 * @returns { object } Return an object with status code and message
 */
export function errorHandler(status, statusText) {
  return {
    status,
    statusText,
  };
}
