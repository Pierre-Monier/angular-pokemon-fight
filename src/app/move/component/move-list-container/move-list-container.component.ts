import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MoveService } from '../../../shared/service/move.service';
import { takeUntil } from 'rxjs/operators';

import { ListContainer } from '../../../shared/domain/list/list';
import { Move, moveSpec } from '../../../shared/model/move/move';

@Component({
  selector: 'app-move-list-container',
  templateUrl: './move-list-container.component.html',
})
export class MoveListContainerComponent
  implements OnInit, OnDestroy, ListContainer {
  private destroy$ = new Subject<void>();
  moves: Move[] = [];
  maxMoveNbr = moveSpec.maxMoveNbr;

  constructor(private moveService: MoveService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.moveService
      .getMoves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moves) => (this.moves = moves));
  }

  deleteItem(id: string): void {
    this.moveService.deleteMove(id);
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
