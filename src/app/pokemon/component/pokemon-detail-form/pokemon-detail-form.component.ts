import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-detail-form',
  templateUrl: './pokemon-detail-form.component.html',
  styleUrls: ['./pokemon-detail-form.component.css']
})
export class PokemonDetailFormComponent implements OnInit {
  @Input()
  pokemon?: Pokemon;
  @Output()
  updateEvent = new EventEmitter<Pokemon>();
  @Output()
  goBackEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  updatePokemon(pokemon: Pokemon): void {
    this.updateEvent.emit(pokemon);
  }

  goBack(): void {
    this.goBackEvent.emit();
  }
}
