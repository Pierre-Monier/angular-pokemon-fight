import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, Player, Phases } from '../../model/game';
import { Move } from '../../../shared/model/move/move';
import { ElemantaryType } from '../../../shared/model/elemantary-type/elemantary-type';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
})
export class GameViewComponent implements OnInit {
  @Input()
  gameState!: Game;
  @Output()
  pokemonAttack = new EventEmitter<Move>();
  @Output()
  runAway = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  emitPokemonAttack(move: Move): void {
    this.pokemonAttack.emit(move);
  }

  emitRunAway(): void {
    this.runAway.emit();
  }

  getTypeImage(type: ElemantaryType): string {
    switch (type) {
      case ElemantaryType.Eau:
        return '../assets/water-type.png';
      case ElemantaryType.Foudre:
        return '../assets/electric-type.png';
      case ElemantaryType.Feu:
        return '../assets/fire-type.png';
      case ElemantaryType.Neutre:
        return '../assets/neutral-type.png';
      case ElemantaryType.Air:
        return '../assets/air-type.png';
      case ElemantaryType.Terre:
        return '../assets/earth-type.png';
      default:
        return 'test';
    }
  }

  UserAttack(): boolean {
    return this.gameState.fight.gameTurn === Player.BOSS && this.gameState.phase === Phases.LOADING_ATTACK.valueOf()
  }

  BossAttack(): boolean {
    return this.gameState.fight.gameTurn === Player.USER && this.gameState.phase === Phases.LOADING_ATTACK.valueOf()
  }
}
