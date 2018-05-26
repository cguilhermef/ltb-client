import { environment } from '@env/environment';

export const endpoints = {
  api: environment.api,
  auth: {
    login: `${ environment.api}/login`,
    register: `${ environment.api }/register`
  }
};
