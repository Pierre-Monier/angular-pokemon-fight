import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../model/game';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent implements OnInit {
  @Input()
  gameState!: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
