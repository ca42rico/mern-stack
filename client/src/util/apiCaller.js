import fetch from "isomorphic-fetch";

export const API_URL = "http://localhost:3000/api";

export default async (endpoint, method = "get", body, jwt = null) => {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "content-type": "application/json",
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      (response) => response,
      (error) => error
    );
};
