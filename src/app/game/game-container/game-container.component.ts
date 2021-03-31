import { Component, OnInit } from '@angular/core';
import {GameService} from '../../shared/service/game.service';
import {INIT} from '../../shared/model/game/game-action';
import {AppUserService} from '../../shared/service/app-user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html'
})
export class GameContainerComponent implements OnInit {

  constructor(private gameService: GameService, private appUserService: AppUserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        console.log('params : ', params);
      });

    // const user = this.appUserService.getCurrentAppUser();
    // const boss = history.state.data;
    // if (user && boss) {
    //   console.log('initing State with user : ', user, ' boss : ', boss);
    //   this.gameService.updateGame(INIT, {user, boss});
    // } else {
    //   console.error('trying to init the game with user : ', user, ' boss : ', boss, window.history.state);
    // }
  }

}
