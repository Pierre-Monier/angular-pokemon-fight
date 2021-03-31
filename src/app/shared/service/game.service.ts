import { Injectable } from '@angular/core';
import {Game} from '../model/game/game';
import {INIT} from '../model/game/game-action';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameState?: Game;
  constructor() {
    const localGame = localStorage.getItem('game');
    if (localGame) {
      this.gameState = JSON.parse(localGame);
    }
  }

  updateGame(action: string, data: Record<any, any>): void {
    switch (action) {
      case INIT:
        this.init(data);
        break;
      default:
        break;
    }

    console.log('updateGame', this.gameState);
    localStorage.setItem('game', JSON.stringify(this.gameState));
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
    return of(this.gameState);
  }

  private init(data: Record<any, any>): void {
    this.gameState = {
      user: data.user,
      boss: data.boss
    };
  }
}
