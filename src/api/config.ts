import { ISiteConf } from "@/types";

let api_host = "backendhost:port",
  api_protocol = "protocol";

export const SITE_CONF: ISiteConf = {
  API_HOST: api_host,
  API_PROTOCOL: api_protocol,
  API_ORIGIN: `${api_protocol}://${api_host}`,
  DEFAULT_PER_PAGE: 20,
  UNEXPECTED_ERROR: "Server xatoligi",
  LOCALSTORAGE_ACCESS_TOKEN_KEY: "k.access_token",
  LOCALSTORAGE_REFRESH_TOKEN_KEY: "k.refresh_token",
};
