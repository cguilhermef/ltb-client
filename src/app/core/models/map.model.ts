import { endpoints } from '@core/endpoints';
import { Mode } from './mode.model';

export class Map {
  private endpoint = endpoints.maps.list;
  id: number;
  name: string;
  active: boolean;
  modes: Mode[];
}
