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
  @Input()
  goBack!: () => void;
  @Input()
  updatePokemon!: (pokemon: Pokemon) => void;
  constructor() { }

  ngOnInit(): void {
  }

}
