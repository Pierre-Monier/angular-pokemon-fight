import {AppUser} from '../user/app-user';
import {Boss} from '../boss/boss';
import {Pokemon} from '../pokemon/pokemon';

export interface Game {
  user: AppUser;
  boss: Boss;
  fight: {
    currentUserPokemon?: Pokemon;
    currentBossPokemon: Pokemon;
    gameTurn: Player;
  };
  phase: Phases;
}

export enum Phases {
  USER_CHOOSING_POKEMON = 'USER_CHOOSING_POKEMON',
  BOSS_PLAYING = 'BOSS_PLAYING',
  USER_PLAYING = 'USER_PLAYING',
}

export enum Player {
  USER = 'USER',
  BOSS = 'BOSS',
}
