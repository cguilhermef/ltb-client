import { RiotGameVersion } from '@core/constants';
import { environment } from '@env/environment';

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
    vacancies: (teamId: number, vacancyId?: number) => {
      const url = `${ environment.api }/teams/${ teamId}/vacancies`;
      return vacancyId ? `${ url }/${ vacancyId}` : url;
    }
  },
  tiers: `${ environment.api }/tiers`,
  riot: {
    profileIcons: (iconId: number) => {
      return `//ddragon.leagueoflegends.com/cdn/${ RiotGameVersion }/img/profileicon/${ iconId }.png `
    }
  }
};
