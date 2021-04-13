import {Component, OnInit} from '@angular/core';
import {GameService} from '../../shared/service/game.service';
import {INIT, USER_CHANGE_POKEMON} from '../../shared/model/game/game-action';
import {AppUserService} from '../../shared/service/app-user.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BossService} from '../../shared/service/boss.service';
import {first} from 'rxjs/operators';
import {Boss} from '../../shared/model/boss/boss';
import {Game, Phases} from '../../shared/model/game/game';
import {AppUser} from '../../shared/model/user/app-user';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
})
export class GameContainerComponent implements OnInit {
  gameState?: Game;

  constructor(
    private gameService: GameService,
    private appUserService: AppUserService,
    public route: ActivatedRoute,
    private bossService: BossService,
    private toastr: ToastrService
  ) {}

  private static isBossFightable(
    boss: Boss | undefined,
    user: AppUser | undefined
  ): boolean {
    return (boss instanceof Boss &&
      user?.bossesDefeated &&
      user.bossesDefeated.length + 1 >= boss.ranking) as boolean;
  }

  private static gameShouldBeUpdated(
    currentGameState: Game | undefined,
    bossId: string | null
  ): boolean {
    return Boolean(
      ((!currentGameState && bossId) ||
        (bossId &&
          currentGameState &&
          currentGameState.boss &&
          currentGameState.boss.id !== bossId)) as boolean
    );
  }

  ngOnInit(): void {
    const currentGameState = this.gameService.getGameState();
    const bossId = this.route.snapshot.paramMap.get('id');

    // we test bossId isn't undefined twice because the compiler isn't that smart
    // TODO we need to add GameContainerComponent.gameShouldBeUpdated(currentGameState, bossId) to this condition
    if (bossId) {
      console.log('Game initation from container');
      this.initGame(bossId);
    } else {
      console.log('Game already initiated');
    }

    this.subscribeToGameState();
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
          console.error('Le boss est trop haut niveau pour vous');
          this.toastr.error('Le boss est trop haut niveau pour vous');
        }
      });
  }

  userChoosePokemon(pokemonId: string): void {
    this.gameService.makeGameAction(USER_CHANGE_POKEMON, { pokemonId });
  }

  private subscribeToGameState(): void {
    this.gameService.subscribeToGameState().subscribe((gameState) => {
      this.gameState = gameState;
      switch (this.gameState?.phase) {
        case Phases.BOSS_PLAYING:
          console.log('Boss is playing');
          break;
        case Phases.USER_PLAYING:
          console.log('User is playing');
          break;
        default:
          break;
      }
      console.log('GameContainer current gameState', this.gameState);
    });
  }
}
