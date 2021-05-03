import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import {
  BOSS_CHANGE_POKEMON,
  BOSS_POKEMON_ATTACK,
  HANDLE_DEAD_POKEMON,
  HANDLE_END_GAME,
  INIT,
  USER_CHANGE_POKEMON,
  USER_POKEMON_ATTACK,
  RUN_AWAY,
} from '../../model/game-action';
import { AppUserService } from '../../../shared/service/app-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BossService } from '../../../shared/service/boss.service';
import { first, takeUntil } from 'rxjs/operators';
import { Boss } from '../../../shared/model/boss/boss';
import { Game, Phases, Player } from '../../model/game';
import { AppUser } from '../../../shared/model/user/app-user';
import { Move } from '../../../shared/model/move/move';
import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { GameDialogService } from '../../service/game-dialog.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
})
export class GameContainerComponent implements OnInit {
  gameState: Game | null = null;
  gameDialog: string;
  private destroy$ = new Subject<void>();

  constructor(
    private gameService: GameService,
    private gameDialogService: GameDialogService,
    private appUserService: AppUserService,
    public route: ActivatedRoute,
    private bossService: BossService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.gameDialog = 'loading...';
  }

  private static isBossFightable(
    boss: Boss | undefined,
    user: AppUser | undefined
  ): boolean {
    return (boss instanceof Boss &&
      user?.bossesDefeated &&
      user.bossesDefeated.length + 1 >= boss.ranking) as boolean;
  }

  ngOnInit(): void {
    this.subscribeToGameState();
    this.subscribeToGameDialog();

    const bossId = this.route.snapshot.paramMap.get('id');

    if (bossId) {
      this.initGame(bossId);
    }
  }

  initGame(bossId: string): void {
    const user = this.appUserService.getCurrentAppUser();

    this.bossService
      .getBoss(bossId)
      .pipe(first())
      .subscribe((boss) => {
        if (GameContainerComponent.isBossFightable(boss, user)) {
          this.gameService.makeGameAction(INIT, { user, boss });
        } else {
          this.toastr.error('Le boss est trop haut niveau pour vous');
        }
      });
  }

  userChoosePokemon(pokemonId: string): void {
    this.gameService.makeGameAction(USER_CHANGE_POKEMON, { pokemonId });
  }

  userPokemonAttack(move: Move): void {
    this.gameService.makeGameAction(USER_POKEMON_ATTACK, { move });
  }

  private subscribeToGameState(): void {
    this.gameService
      .subscribeToGameState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((gameState) => {
        this.gameState = gameState;

        if (this.gameState) {
          switch (this.gameState?.phase) {
            case Phases.BOSS_PLAYING:
              this.gameDialogService.getNeedAttackDialog(
                this.gameState.boss.name
              );
              this.gameService.makeGameAction(BOSS_POKEMON_ATTACK, {});
              break;
            case Phases.USER_PLAYING:
              this.gameDialogService.getNeedAttackDialog(
                this.gameState.user.displayName
              );
              break;
            case Phases.BOSS_POKEMON_IS_DEAD:
              this.gameDialogService.getNeedNewPokemonDialog(
                this.gameState.fight.currentBossPokemon.name,
                this.gameState.boss.name
              );
              this.gameService.makeGameAction(HANDLE_DEAD_POKEMON, {
                player: Player.BOSS,
              });
              break;
            case Phases.USER_POKEMON_IS_DEAD:
              if (this.gameState.fight.currentUserPokemon) {
                this.gameDialogService.getNeedNewPokemonDialog(
                  this.gameState.fight.currentUserPokemon.name,
                  this.gameState.user.displayName
                );
              }
              this.gameService.makeGameAction(HANDLE_DEAD_POKEMON, {
                player: Player.USER,
              });
              break;
            case Phases.BOSS_CHOOSING_POKEMON:
              this.gameDialogService.getNeedNewPokemonDialog(
                this.gameState.fight.currentBossPokemon.name,
                this.gameState.boss.name
              );

              this.gameService.makeGameAction(BOSS_CHANGE_POKEMON, {});
              break;
            case Phases.BOSS_WIN:
              this.gameDialogService.getSomeoneWinDialog(
                this.gameState.boss.name
              );
              this.gameService.makeGameAction(HANDLE_END_GAME, {
                winner: Player.BOSS,
              });

              this.unsuscribe();
              break;
            case Phases.USER_WIN:
              this.gameDialogService.getSomeoneWinDialog(
                this.gameState.user.displayName
              );
              this.gameService.makeGameAction(HANDLE_END_GAME, {
                winner: Player.USER,
                bossId: this.gameState.boss.id,
              });

              this.unsuscribe();
              break;
            default:
              break;
          }
        }
      });
  }

  runAway(): void {
    this.gameService.makeGameAction(RUN_AWAY, {});
    this.router.navigateByUrl('/adventure');
  }

  private subscribeToGameDialog(): void {
    this.gameDialogService.subscribeGameDialogs().subscribe((gameDialog) => {
      this.gameDialog = gameDialog;
    });
  }

  getSelectableUserPokemon(): Pokemon[] | undefined {
    return this.gameState?.user.pokemons?.filter(
      (pokemon) => !this.gameState?.fight.userDeadPokemons.includes(pokemon.id)
    );
  }

  private unsuscribe(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
