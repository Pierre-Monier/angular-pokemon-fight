import { AppUser } from '../../shared/model/user/app-user';
import { Boss } from '../../shared/model/boss/boss';
import { Pokemon } from '../../shared/model/pokemon/pokemon';

export interface Game {
  user: AppUser;
  boss: Boss;
  fight: {
    currentUserPokemon?: Pokemon;
    currentBossPokemon: Pokemon;
    gameTurn: Player;
    bossDeadPokemons: string[];
    userDeadPokemons: string[];
  };
  phase: Phases;
}

export enum Phases {
  USER_CHOOSING_POKEMON = 'USER_CHOOSING_POKEMON',
  BOSS_CHOOSING_POKEMON = 'BOSS_CHOOSING_POKEMON',
  BOSS_PLAYING = 'BOSS_PLAYING',
  USER_PLAYING = 'USER_PLAYING',
  BOSS_POKEMON_IS_DEAD = 'BOSS_POKEMON_IS_DEAD',
  USER_POKEMON_IS_DEAD = 'USER_POKEMON_IS_DEAD',
  BOSS_WIN = 'BOSS_WIN',
  USER_WIN = 'USER_WIN',
}

export enum Player {
  USER = 'USER',
  BOSS = 'BOSS',
}
