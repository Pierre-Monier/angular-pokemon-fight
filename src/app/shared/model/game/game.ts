import { AppUser } from '../user/app-user';
import { Boss } from '../boss/boss';

export interface Game {
  user: AppUser;
  boss: Boss;
}
