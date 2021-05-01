import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../model/game';
import { Move } from '../../../shared/model/move/move';

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
  constructor() {}

  ngOnInit(): void {}

  emitPokemonAttack(move: Move): void {
    this.pokemonAttack.emit(move);
  }
}
