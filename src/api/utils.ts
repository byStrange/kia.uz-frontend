import { SITE_CONF } from '@/api/config';
import { getToken } from '@/utils';

import axios from 'axios';

interface IAxiosArgs {
  hasAuthHeaders?: boolean;
  hasOrigin?: boolean;
}

export const axe = (
  opt: IAxiosArgs = { hasOrigin: true, hasAuthHeaders: true }
) => {
  var options = {};

  Object.assign(options, { baseURL: SITE_CONF.API_ORIGIN });

  const instance = axios.create(options);

  if (opt.hasAuthHeaders)
    instance.defaults.headers.common['Authorization'] = `Bearer ${
      getToken().access
    }`;

  return instance;
};
