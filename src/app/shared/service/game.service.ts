import { Injectable } from '@angular/core';
import {Game} from '../model/game/game';
import {INIT} from '../model/game/game-action';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameState?: Game;
  constructor() { }

  updateGame(action: string, data: Record<any, any>): void {
    switch (action) {
      case INIT:
        this.init(data);
        break;
      default:
        break;
    }
  }

  private init(data: Record<any, any>): void {
    this.gameState = {
      user: data.user,
      boss: data.boss
    };
  }
}
