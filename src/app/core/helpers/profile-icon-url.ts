import { endpoints } from '@core/endpoints';

export function ProfileIconUrl(iconId: number): string {
  return endpoints.riot.profileIcons(iconId);
}
