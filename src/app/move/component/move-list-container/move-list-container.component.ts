import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { MoveService } from '../../../shared/service/move.service';
import { ListContainer } from '../../../shared/interface/list';
import { Move, moveSpec } from '../../../shared/model/move/move';
import { Pokemon } from '../../../shared/model/pokemon/pokemon';

@Component({
  selector: 'app-move-list-container',
  templateUrl: './move-list-container.component.html',
})
export class MoveListContainerComponent
  implements OnInit, OnDestroy, ListContainer {
  private destroy$ = new Subject<void>();
  moves: Move[] = [];
  maxMoveNbr = moveSpec.maxMoveNbr;

  constructor(
    private moveService: MoveService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.moveService
      .getMoves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moves) => (this.moves = moves));
  }

  deleteItem(moveId: string): void {
    this.toastr.success('Le move à été supprimé');
    this.moveService.deleteMove(moveId);
  }

  alertDeleteItem(moveId: string): void {
    this.toastr
      .error(
        'Cliquer sur ce message pour confirmer',
        'Attention vous vous apprêtez à supprimer un move'
      )
      .onTap.pipe(take(2))
      .subscribe(() => this.deleteItem(moveId));
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
