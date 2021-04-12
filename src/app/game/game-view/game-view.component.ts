import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../shared/model/game/game';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  @Input()
  gameState!: Game;
  constructor() {}

  ngOnInit(): void {}
}
