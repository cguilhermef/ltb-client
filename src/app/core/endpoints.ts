import { environment } from '@env/environment';

const patch = '6.24.1';

export const endpoints = {
  api: environment.api,
  auth: {
    login: `${ environment.api}/login`,
    register: `${ environment.api }/register`
  },
  maps: {
    list: `${ environment.api }/maps`
  },
  regions: {
    list: `${ environment.api }/regions`
  },
  roles: {
    list: `${ environment.api }/roles`
  },
  teams: {
    list: `${ environment.api }/teams`,
    byId: (id: number) => `${ environment.api }/teams/${ id }`,
    vacancies: (teamId: number) => `${ environment.api }/teams/${ teamId}/vacancies`
  },
  tiers: `${ environment.api }/tiers`,
  riot: {
    profileIcons: (iconId: number) => {
      return `//ddragon.leagueoflegends.com/cdn/${ patch }/img/profileicon/${ iconId }.png `
    }
  }
};
