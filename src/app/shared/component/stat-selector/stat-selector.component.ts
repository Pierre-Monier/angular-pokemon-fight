import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Pokemon, PokemonStat } from '../../model/pokemon/pokemon';

@Component({
  selector: 'app-stat-selector',
  templateUrl: './stat-selector.component.html',
  styleUrls: ['./stat-selector.component.css'],
})
export class StatSelectorComponent implements OnInit {
  @Input()
  max!: number;
  @Input()
  min!: number;
  @Input()
  current!: number;
  @Input()
  property!: PokemonStat;
  @Output()
  addPointEvent = new EventEmitter<PokemonStat>();
  @Output()
  removePointEvent = new EventEmitter<PokemonStat>();

  constructor() {}

  ngOnInit(): void {}

  addPoint(property: PokemonStat): void {
    this.addPointEvent.emit(property);
  }

  removePoint(property: PokemonStat): void {
    this.removePointEvent.emit(property);
  }
}
