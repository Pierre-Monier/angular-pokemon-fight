import { Injectable } from '@angular/core';
import { Game, Phases, Player } from '../model/game';
import {
  BOSS_CHANGE_POKEMON,
  BOSS_POKEMON_ATTACK,
  HANDLE_DEAD_POKEMON,
  HANDLE_END_GAME,
  INIT,
  USER_CHANGE_POKEMON,
  USER_POKEMON_ATTACK,
  RESTART_GAME,
  RUN_AWAY,
} from '../model/game-action';
import { combineLatest, Observable, Subject } from 'rxjs';
import { PokemonService } from '../../shared/service/pokemon.service';
import { Pokemon } from '../../shared/model/pokemon/pokemon';
import { MoveService } from '../../shared/service/move.service';
import { Move } from '../../shared/model/move/move';
import { getRandomInt, getElementaryTypeDominanceBonus } from '../utils/utils';
import { GameDialogService } from './game-dialog.service';
import { AppUserService } from '../../shared/service/app-user.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private pokemonService: PokemonService,
    private moveService: MoveService,
    private gameDialogService: GameDialogService,
    private appUserService: AppUserService,
    public route: ActivatedRoute
  ) {
    this.gameState$ = new Subject<Game | null>();
  }

  private static GAME_DELAY = 2000;
  gameState: Game | null = null;
  gameState$: Subject<Game | null>;
  // use to avoid calling two time the same action (avoid bug)
  lastAction = '';

  private static chooseBossPokemon(bossPokemons: Pokemon[]): Pokemon {
    return bossPokemons[Math.round(Math.random() * (bossPokemons.length - 1))];
  }

  private static getUpdatedPvWithDialog(
    move: Move,
    attackedPokemon: Pokemon
  ): { pv: number; dialogType: string } {
    const attackedPokemonDodge = Math.max(1, attackedPokemon.e - move.e);
    const moveCritic = Math.max(1, move.cc - attackedPokemon.cc);
    const elementaryTypeDominanceBonus = getElementaryTypeDominanceBonus(
      move.type,
      attackedPokemon.type
    );

    if (attackedPokemonDodge > getRandomInt(100)) {
      // the attacked pokemon dodge the attack
      return { pv: attackedPokemon.pv, dialogType: 'miss' };
    } else if (moveCritic > getRandomInt(100)) {
      // the move done a critic !
      return {
        pv:
          (attackedPokemon.pv - move.damage * 1.7) *
          elementaryTypeDominanceBonus,
        dialogType: 'critic',
      };
    } else {
      // regular damage
      return {
        pv: (attackedPokemon.pv - move.damage) * elementaryTypeDominanceBonus,
        dialogType: 'regular',
      };
    }
  }

  private handleEndGame(data: Record<any, any>): void {
    this.deleteGameState();
    const winner = data.winner;
    const bossId = data.bossId;

    if (winner && winner === Player.USER.valueOf() && bossId) {
      // update user data
      this.appUserService.addBossToBossDefeated(bossId);
    }
  }

  getGameState(): Game | null {
    return this.gameState;
  }

  subscribeToGameState(): Observable<Game | null> {
    return this.gameState$.asObservable();
  }

  makeGameAction(action: string, data: Record<any, any>): void {
    switch (action) {
      case INIT:
        if (this.lastAction !== INIT) {
          this.lastAction = INIT;
          this.init(data);
        }
        break;
      case USER_CHANGE_POKEMON:
        if (this.lastAction !== USER_CHANGE_POKEMON) {
          this.lastAction = USER_CHANGE_POKEMON;
          this.changeUserPokemon(data);
        }
        break;
      case BOSS_CHANGE_POKEMON:
        if (this.lastAction !== BOSS_CHANGE_POKEMON) {
          this.lastAction = BOSS_CHANGE_POKEMON;
          setTimeout(() => {
            this.changeBossPokemon();
          }, GameService.GAME_DELAY);
        }
        break;
      case USER_POKEMON_ATTACK:
        if (this.lastAction !== USER_POKEMON_ATTACK) {
          this.lastAction = USER_POKEMON_ATTACK;
          this.userPokemonAttack(data);
        }
        break;
      case BOSS_POKEMON_ATTACK:
        if (this.lastAction !== BOSS_POKEMON_ATTACK) {
          this.lastAction = BOSS_POKEMON_ATTACK;
          setTimeout(() => {
            this.bossPokemonAttack();
          }, GameService.GAME_DELAY);
        }
        break;
      case HANDLE_DEAD_POKEMON:
        if (this.lastAction !== HANDLE_DEAD_POKEMON) {
          this.lastAction = HANDLE_DEAD_POKEMON;
          this.handleDeadPokemon(data);
        }
        break;
      case HANDLE_END_GAME:
        if (this.lastAction !== HANDLE_END_GAME) {
          this.lastAction = HANDLE_END_GAME;
          this.handleEndGame(data);
        }
        break;
      case RESTART_GAME:
        if (this.lastAction !== RESTART_GAME) {
          this.lastAction = RESTART_GAME;
          this.restartGame();
        }
        break;
      case RUN_AWAY:
        if (this.lastAction !== RUN_AWAY) {
          this.lastAction = RUN_AWAY;
          this.deleteGameState();
        }
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
        // If the user change pokemon and the game as already start
        // the boss play
        // else it depend on who start the game
        const newPhase = this.gameState.fight.userDeadPokemons.length
          ? Phases.BOSS_PLAYING
          : this.gameState.fight.gameTurn === Player.USER
          ? Phases.USER_PLAYING
          : Phases.BOSS_PLAYING;

        const newGameState = {
          ...this.gameState,
          fight: {
            ...this.gameState.fight,
            currentUserPokemon,
          },
          phase: newPhase,
        };

        this.gameDialogService.getDidSelectNewPokemon(
          this.gameState.user.displayName,
          currentUserPokemon.name
        );

        setTimeout(() => {
          this.updateGameState(newGameState);
        }, GameService.GAME_DELAY);
      } else {
        console.error('Unable to select your pokemon :(');
      }
    }
  }

  private changeBossPokemon(): void {
    if (this.gameState && this.gameState.boss.pokemons) {
      const bossSelectablePokemons = this.gameState.boss.pokemons.filter(
        (pokemon) =>
          !this.gameState?.fight.bossDeadPokemons.includes(pokemon.id)
      );

      const currentBossPokemon =
        bossSelectablePokemons[getRandomInt(bossSelectablePokemons.length)];

      const newGameState = {
        ...this.gameState,
        fight: {
          ...this.gameState.fight,
          currentBossPokemon,
        },
        phase: Phases.USER_PLAYING,
      };

      this.gameDialogService.getDidSelectNewPokemon(
        this.gameState.boss.name,
        currentBossPokemon.name
      );
      setTimeout(() => {
        this.updateGameState(newGameState);
      }, GameService.GAME_DELAY);
    }
  }

  private userPokemonAttack(data: Record<any, any>): void {
    if (
      this.gameState &&
      data.move &&
      this.gameState.fight.currentUserPokemon
    ) {
      const { pv, dialogType } = GameService.getUpdatedPvWithDialog(
        data.move as Move,
        this.gameState.fight.currentBossPokemon
      );

      this.gameState.fight.currentBossPokemon.pv = pv;

      const newGameState = {
        ...this.gameState,
        fight: {
          ...this.gameState.fight,
          gameTurn: Player.BOSS,
        },
        phase:
          this.gameState.fight.currentBossPokemon.pv > 0
            ? Phases.BOSS_PLAYING
            : Phases.BOSS_POKEMON_IS_DEAD,
      };

      this.gameDialogService.getDidAttackDialog(
        this.gameState.fight.currentUserPokemon.name,
        data.move.name
      );

      setTimeout(() => {
        if (dialogType === 'regular') {
          this.updateGameState(newGameState);
        } else {
          this.gameDialogService.getDamageDialog(dialogType);
          setTimeout(() => {
            this.updateGameState(newGameState);
          }, GameService.GAME_DELAY);
        }
      }, GameService.GAME_DELAY);
    }
  }

  private bossPokemonAttack(): void {
    if (this.gameState && this.gameState.fight.currentUserPokemon) {
      const move = this.gameState.fight.currentBossPokemon.moves[
        getRandomInt(this.gameState.fight.currentBossPokemon.moves.length)
      ];

      const { pv, dialogType } = GameService.getUpdatedPvWithDialog(
        move as Move,
        this.gameState.fight.currentUserPokemon
      );

      this.gameState.fight.currentUserPokemon.pv = pv;

      const newGameState = {
        ...this.gameState,
        fight: {
          ...this.gameState.fight,
          gameTurn: Player.USER,
        },
        phase:
          this.gameState.fight.currentUserPokemon.pv > 0
            ? Phases.USER_PLAYING
            : Phases.USER_POKEMON_IS_DEAD,
      };

      this.gameDialogService.getDidAttackDialog(
        this.gameState.fight.currentBossPokemon.name,
        move.name
      );

      setTimeout(() => {
        if (dialogType === 'regular') {
          this.updateGameState(newGameState);
        } else {
          // if the move done something irregular, we push this data to gameDialog service
          // then the game keep going
          this.gameDialogService.getDamageDialog(dialogType);
          setTimeout(() => {
            this.updateGameState(newGameState);
          }, GameService.GAME_DELAY);
        }
      }, GameService.GAME_DELAY);
    }
  }

  private handleDeadPokemon(data: Record<any, any>): void {
    if (
      this.gameState &&
      this.gameState.fight.currentUserPokemon &&
      data.player
    ) {
      let newGameState = this.gameState;

      switch (data.player) {
        case Player.USER:
          if (
            !this.gameState.fight.userDeadPokemons.includes(
              this.gameState.fight.currentUserPokemon.id
            )
          ) {
            this.gameState.fight.userDeadPokemons.push(
              this.gameState.fight.currentUserPokemon.id
            );

            newGameState = {
              ...this.gameState,
              phase:
                this.gameState.fight.userDeadPokemons.length ===
                this.gameState.user.pokemons?.length
                  ? Phases.BOSS_WIN
                  : Phases.USER_CHOOSING_POKEMON,
            };

            this.updateGameState(newGameState);
          }
          break;
        case Player.BOSS:
          if (
            !this.gameState.fight.bossDeadPokemons.includes(
              this.gameState.fight.currentBossPokemon.id
            )
          ) {
            this.gameState.fight.bossDeadPokemons.push(
              this.gameState.fight.currentBossPokemon.id
            );

            newGameState = {
              ...this.gameState,
              phase:
                this.gameState.fight.bossDeadPokemons.length ===
                this.gameState.boss.pokemons?.length
                  ? Phases.USER_WIN
                  : Phases.BOSS_CHOOSING_POKEMON,
            };

            this.updateGameState(newGameState);
          }
          break;
        default:
          break;
      }
    }
  }

  private init(data: Record<any, any>): void {
    // first we get all the pokemon for the user and for the boss
    combineLatest([
      this.pokemonService.getPokemons(),
      this.pokemonService.getPokemons(data.boss.id),
    ]).subscribe(([userPokemons, bossPokemons]) => {
      // use to get all the moves we need from firestore
      const moves$: Observable<Move[]>[] = [];

      // add observables for each pokemon in order to get it's move
      userPokemons.forEach((pokemon) => {
        moves$.push(this.moveService.getMoves(pokemon.movesIds));
      });
      data.user.pokemons = userPokemons;

      // same here
      bossPokemons.forEach((pokemon) => {
        moves$.push(this.moveService.getMoves(pokemon.movesIds, data.boss.id));
      });
      data.boss.pokemons = bossPokemons;

      combineLatest(moves$).subscribe((moves) => {
        // Here we add moves to each pokemon
        // I think it can be optimise with pokemon reference on move
        // but that not how we have represented our data :(
        moves.forEach((movesTab) => {
          movesTab.forEach((move) => {
            // we filter at this stage to avoid unnecessary loop
            // two is already way to much :(
            if (move.userUid === data.user.uid) {
              data.user.pokemons.forEach((pokemon: Pokemon) => {
                // the second condition in if avoid duplicate (cause by how js object works)
                if (
                  pokemon.movesIds.includes(move.id) &&
                  pokemon.moves.map((el) => el.id).indexOf(move.id) === -1
                ) {
                  pokemon.moves.push(move);
                }
              });
            } else if (move.userUid === data.boss.id) {
              data.boss.pokemons.forEach((pokemon: Pokemon) => {
                if (
                  pokemon.movesIds.includes(move.id) &&
                  pokemon.moves.map((el) => el.id).indexOf(move.id) === -1
                ) {
                  pokemon.moves.push(move);
                }
              });
            }
          });
        });

        const currentPlayer = Math.round(Math.random())
          ? Player.USER
          : Player.BOSS;

        const newGameState = {
          user: data.user,
          boss: data.boss,
          fight: {
            currentUserPokemon: undefined,
            currentBossPokemon: GameService.chooseBossPokemon(bossPokemons),
            gameTurn: currentPlayer,
            bossDeadPokemons: [],
            userDeadPokemons: [],
          },
          phase: Phases.USER_CHOOSING_POKEMON,
        };

        const trainerName =
          currentPlayer === Player.USER
            ? data.user.displayName
            : data.boss.name;

        this.gameDialogService.getNeedAttackDialog(trainerName);
        this.updateGameState(newGameState);
      });
    });
  }

  private restartGame(): void {
    this.gameState$.next(this.gameState);
  }

  private updateGameState(newGameState: Game): void {
    this.gameState = newGameState;
    this.gameState$.next(newGameState);
  }

  private deleteGameState(): void {
    this.gameState = null;
  }
}
