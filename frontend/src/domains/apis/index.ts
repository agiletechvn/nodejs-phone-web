import { extend } from 'umi-request';

const API_VERSION = process.env.API_VERSION || '';
const END_POINT = process.env.END_POINT || 'http://localhost:3001';

const BE = extend({
  prefix: `${END_POINT}${API_VERSION}`,
});

export const PATHS = {
  PHONE_CREATE: `/phones`,
  PHONE_UPDATE: (id: number) => `/phones/${id}`,
  PHONE_DELETE: (id: number) => `/phones/${id}`,
  PHONE_LIST: `/phones`,
};

export default BE;
