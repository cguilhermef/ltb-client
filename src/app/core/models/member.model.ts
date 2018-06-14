import { Role } from '@core/models/role.model';
import { User } from '@core/models/user.model';

export class Member {
  id: number;
  role: Role;
  role_id: number;
  team_id: number;
  user: User;
  user_id: number;
}
