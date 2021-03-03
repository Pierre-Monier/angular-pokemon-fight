import { Component, OnInit } from '@angular/core';
import { Move } from '../shared/model/move/move';
import { MoveService } from '../shared/service/move.service';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})

export class MoveComponent implements OnInit {
  moves: Move[] = [];
  selectedMove?: Move;
  constructor(private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.getMoves();
  }

  getMoves(): void {
    this.moveService.getMoves()
      .subscribe(moves => this.moves = moves);
  }
}
