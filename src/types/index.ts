import { Ref } from 'vue';

import { extend } from '@vue/shared';
import { RouteLocationNormalized } from 'vue-router';

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

export type BreadCrumbMeta = {
  breadcrumb?:
    | string
    | ((params: {
        route: RouteLocationNormalized;
        title: Ref<string>;
      }) => string);
};

export interface StringMap {
  [key: string]: string | number;
}
