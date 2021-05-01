import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDialogService {
  constructor() {
    this.gameDialog$ = new Subject<string>();
  }
  private static GAMEDIALOG_LOCALSTORAGE_KEY = 'game_dialog';
  gameDialog$: Subject<string>;

  private static setLastDialog(dialog: string): void {
    localStorage.setItem(
      GameDialogService.GAMEDIALOG_LOCALSTORAGE_KEY,
      JSON.stringify(dialog)
    );
  }

  getDamageDialog(type: string): void {
    const dialog =
      type === 'miss'
        ? 'The attack missed the target :('
        : type === 'critic'
        ? 'It works very well :)'
        : undefined;

    if (dialog) {
      GameDialogService.setLastDialog(dialog);
      this.gameDialog$.next(dialog);
    }
  }

  getNeedAttackDialog(trainer: string): void {
    const dialog = `It's ${trainer} turn`;
    GameDialogService.setLastDialog(dialog);
    this.gameDialog$.next(dialog);
  }

  getDidAttackDialog(assailantPokemonName: string, moveName: string): void {
    const dialog = `${assailantPokemonName} use ${moveName}`;
    GameDialogService.setLastDialog(dialog);
    this.gameDialog$.next(dialog);
  }

  getNeedNewPokemonDialog(deadPokemonName: string, trainer: string): void {
    const dialog = `${deadPokemonName} is dead, ${trainer} need to pick up a new one`;
    GameDialogService.setLastDialog(dialog);
    this.gameDialog$.next(dialog);
  }

  getDidSelectNewPokemon(trainer: string, newPokemonName: string): void {
    const dialog = `${trainer} choose ${newPokemonName}`;
    GameDialogService.setLastDialog(dialog);
    this.gameDialog$.next(dialog);
  }

  getSomeoneWinDialog(winnerName: string): void {
    const dialog = `${winnerName} win the game`;
    GameDialogService.setLastDialog(dialog);
    this.gameDialog$.next(dialog);
  }

  getLastDialog(): void {
    const dialog = localStorage.getItem(
      GameDialogService.GAMEDIALOG_LOCALSTORAGE_KEY
    );

    if (dialog) {
      // we remove " character from string
      this.gameDialog$.next(dialog.replace(/"/g, ''));
    }
  }

  subscribeGameDialogs(): Observable<string> {
    return this.gameDialog$.asObservable();
  }
}
