import {uniqueIdGenerator} from "../helpers/AT-helpers";

const getFetchOptions = () => ({
  method: "GET",
  headers: { REQUEST_ID: uniqueIdGenerator() },
  credentials: "include"
});

export const getFetch = url => {
  return fetchJSON(url, {
    ...getFetchOptions(),
    maxRetries: XHR_MAX_RETRY
  }).catch(err => {
    publishApplicationError(err);
  });
};