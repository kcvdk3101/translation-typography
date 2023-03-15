import { API_METHODS } from "../constants";
import { objectToQueryString } from "../utils/utils";
import { errorHandler } from "./errorHandler";

/**
 * Generic request function
 *
 * @param { string } url API endpoint
 * @param { object } params Parameters
 * @param { string } method API methods
 * @returns { any } Return Promise value
 */
export async function request(url, params, method = API_METHODS.GET) {
  const options = {
    method,
    mode: "cors",
    credentials: "omit",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      // "Access-Control-Allow-Origin": "*",
    },
  };

  if (params) {
    if (method === API_METHODS.GET) {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(url, options);

  // Error Handler
  if (!response.ok) {
    return errorHandler(response.status, response.statusText);
  }

  const result = await response.json();

  return result;
}

/**
 * GET method
 *
 * @param { string } url API endpoint
 * @param { object } params Parameters
 * @returns { any } Return Promise object
 */
export async function getJSON(url, params) {
  return await request(url, params, API_METHODS.GET);
}

/**
 * POST method
 *
 * @param { string } url API endpoint
 * @param { object } params Parameters
 * @returns { any } Return Promise object
 */
export async function postJSON(url, params) {
  return request(url, params, API_METHODS.POST);
}

/**
 * PUT method
 *
 * @param { string } url API endpoint
 * @param { object } params Parameters
 * @returns { any } Return Promise object
 */
export async function putJSON(url, params) {
  return request(url, params, API_METHODS.PUT);
}

/**
 * DELETE method
 *
 * @param { string } url API endpoint
 * @param { object } params Parameters
 * @returns { any } Return Promise object
 */
export async function deleteJSON(url, params) {
  return request(url, params, API_METHODS.DELETE);
}
