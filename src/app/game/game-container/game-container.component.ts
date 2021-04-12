import { Component, OnInit } from '@angular/core';
import {GameService} from '../../shared/service/game.service';
import {INIT} from '../../shared/model/game/game-action';
import {AppUserService} from '../../shared/service/app-user.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BossService} from '../../shared/service/boss.service';
import {first} from 'rxjs/operators';
import {Boss} from "../../shared/model/boss/boss";
import {Game} from "../../shared/model/game/game";
import {AppUser} from "../../shared/model/user/app-user";

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html'
})
export class GameContainerComponent implements OnInit {
  gameState?: Game;

  constructor(
    private gameService: GameService,
    private appUserService: AppUserService,
    public route: ActivatedRoute,
    private bossService: BossService,
    private toastr: ToastrService
  ) { }

  private static isBossFightable(boss: Boss | undefined, user: AppUser | undefined): boolean {
    return (boss instanceof Boss && user?.bossesDefeated && (user.bossesDefeated.length + 1 >= boss.ranking)) as boolean;
  }

  private static gameShouldBeUpdated(currentGameState: Game | undefined, bossId: string | null): boolean {
    return (!currentGameState && bossId
      || (bossId && currentGameState && currentGameState.boss && currentGameState.boss.id !== bossId)) as boolean;
  }

  ngOnInit(): void {
    const currentGameState = this.gameService.getGameState();
    const bossId = this.route.snapshot.paramMap.get('id');

    // we test bossId isn't undefined twice because the compiler isn't that smart
    if (GameContainerComponent.gameShouldBeUpdated(currentGameState, bossId) && bossId) {
      this.initGame(bossId);
    } else {
      console.log('Game already initiated');
    }

    this.gameService.subscribeToGameState().subscribe((gameState) => {
      this.gameState = gameState;
      console.log('sub in container', this.gameState);
    });
  }

  initGame(bossId: string): void {
    const user = this.appUserService.getCurrentAppUser();

    this.bossService.getBoss(bossId).toPromise()
      .then((boss) => {
        if (GameContainerComponent.isBossFightable(boss, user)) {
          this.gameService.updateGame(INIT, { user, boss });
        } else {
          console.error('Le boss est trop haut niveau pour vous');
          this.toastr.error('Le boss est trop haut niveau pour vous');
        }
     })
      .catch(() => this.toastr.error('Il y a eu une erreur désolé'));
  }
}
