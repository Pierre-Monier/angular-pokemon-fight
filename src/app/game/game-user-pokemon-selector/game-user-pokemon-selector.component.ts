import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../shared/model/pokemon/pokemon';

@Component({
  selector: 'app-game-user-pokemon-selector',
  templateUrl: './game-user-pokemon-selector.component.html',
  styleUrls: ['./game-user-pokemon-selector.component.scss'],
})
export class GameUserPokemonSelectorComponent implements OnInit {
  @Input()
  pokemons?: Pokemon[];
  @Output()
  choosePokemon = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  emitChoosePokemon(pokemonId: string): void {
    this.choosePokemon.emit(pokemonId);
  }
}
