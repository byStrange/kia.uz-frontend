import { extend } from "@vue/shared";

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export default VueComponent;

export interface ISiteConf {
  API_ORIGIN: string;
  API_HOST: string;
  API_PROTOCOL: string;
  DEFAULT_PER_PAGE: number;
  UNEXPECTED_ERROR: string;
  LOCALSTORAGE_ACCESS_TOKEN_KEY?: string;
  LOCALSTORAGE_REFRESH_TOKEN_KEY?: string;
}

export interface StringMap {
  [key: string]: string | number;
}

export type Language = {
  code: string;
  name: string;
};
