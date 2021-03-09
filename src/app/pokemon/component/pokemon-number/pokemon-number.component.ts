import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pokemon-number',
  templateUrl: './pokemon-number.component.html',
  styleUrls: ['./pokemon-number.component.css']
})
export class PokemonNumberComponent implements OnInit {
  @Input()
  currentNumber!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
