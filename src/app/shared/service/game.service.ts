import { Injectable } from '@angular/core';
import { Game, Phases, Player } from '../model/game/game';
import { INIT, USER_CHANGE_POKEMON } from '../model/game/game-action';
import { Observable, Subject } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { first } from 'rxjs/operators';
import { Pokemon } from '../model/pokemon/pokemon';
import { AppUser } from '../model/user/app-user';
import { Boss } from '../model/boss/boss';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private pokemonService: PokemonService) {
    this.gameState$ = new Subject<Game | undefined>();
    const localGame = localStorage.getItem('game');
    if (localGame) {
      this.gameState = JSON.parse(localGame);
    }
  }
  gameState?: Game;
  gameState$: Subject<Game | undefined>;

  private static chooseBossPokemon(bossPokemons: Pokemon[]): Pokemon {
    // select a pokemon for the boss
    return bossPokemons[Math.round(Math.random() * (bossPokemons.length - 1))];
  }

  getGameState(): Game | undefined {
    if (this.gameState) {
      return this.gameState;
    }

    const localGame = localStorage.getItem('game');
    if (localGame) {
      return JSON.parse(localGame);
    }

    return undefined;
  }

  subscribeToGameState(): Observable<Game | undefined> {
    return this.gameState$.asObservable();
  }

  makeGameAction(action: string, data: Record<any, any>): void {
    switch (action) {
      case INIT:
        this.init(data);
        break;
      case USER_CHANGE_POKEMON:
        this.changeUserPokemon(data);
        break;
      default:
        break;
    }
  }

  private changeUserPokemon(data: Record<any, any>): void {
    if (this.gameState && this.gameState.user.pokemons && data.pokemonId) {
      const currentUserPokemon = this.gameState.user.pokemons.find(
        (pokemon) => pokemon.id === data.pokemonId
      );

      if (currentUserPokemon) {
        const newGameState = {
          ...this.gameState,
          fight: {
            ...this.gameState.fight,
            currentUserPokemon,
          },
          phase:
            this.gameState.fight.gameTurn === Player.USER
              ? Phases.USER_PLAYING
              : Phases.BOSS_PLAYING,
        };

        this.updateGameState(newGameState);
      } else {
        console.log('Unable to select your pokemon :(');
      }
    }
  }

  private init(data: Record<any, any>): void {
    this.pokemonService
      .getPokemons()
      .pipe(first())
      .subscribe((pokemons) => {
        data.user.pokemons = pokemons;

        this.pokemonService
          .getPokemons(data.boss.id)
          .pipe(first())
          .subscribe((bossPokemons) => {
            data.boss.pokemons = bossPokemons;

            const newGameState = {
              user: data.user as AppUser,
              boss: data.boss as Boss,
              fight: {
                currentUserPokemon: undefined,
                currentBossPokemon: GameService.chooseBossPokemon(bossPokemons),
                gameTurn: Math.round(Math.random()) ? Player.USER : Player.BOSS,
              },
              phase: Phases.USER_CHOOSING_POKEMON,
            };

            this.updateGameState(newGameState);
          });
      });
  }

  private updateGameState(newGameState: Game): void {
    this.gameState = newGameState;
    this.gameState$.next(newGameState);
    console.log('updateGame', this.gameState);
    localStorage.setItem('game', JSON.stringify(this.gameState));
  }
}
