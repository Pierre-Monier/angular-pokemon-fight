import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormContainer, FormMode } from '../../../shared/interface/form';
import {
  defaultMove,
  getMoveStatPoint,
  isMoveStat,
  Move,
  moveSpec,
} from '../../../shared/model/move/move';
import { FormService } from '../../../shared/service/form.service';
import { MoveService } from '../../../shared/service/move.service';
import { elemantaryTypeToArray } from '../../../shared/model/elemantary-type/elemantary-type';
import { AppStat } from '../../../shared/interface/app-stat';

@Component({
  selector: 'app-move-form-container',
  templateUrl: './move-form-container.component.html',
})
export class MoveFormContainerComponent
  implements OnInit, OnDestroy, FormContainer {
  private destroy$ = new Subject<void>();
  move = defaultMove;
  elemantaryTypes = elemantaryTypeToArray();
  points = moveSpec.maxPoints;
  type: FormMode;

  constructor(
    private route: ActivatedRoute,
    private moveService: MoveService,
    private location: Location,
    private formService: FormService
  ) {
    const { type } = this.route.snapshot.data;
    this.type = type;
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (this.type === 'update') {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.moveService
          .getMove(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((move) => {
            if (move) {
              this.move = move;
              // we update the current points base on the existing pokemon
              this.updatePoints();
            }
          });
      } else {
        console.error('Trying to edit a move without specifying a id');
      }
    } else if (this.type !== 'create') {
      console.error('Trying to create a form with the wrong type');
    }
  }

  updatePoints(): void {
    this.points = moveSpec.maxPoints - getMoveStatPoint(this.move);
  }

  submit(entity: Move): void {
    if (this.formService.isMoveFormValid(entity)) {
      this.moveService.submitMove(this.type, entity);
      this.goBack();
    } else {
      console.error('Trying to submit move with wrong values');
    }
  }

  addPoint(property: AppStat): void {
    if (this.points > 0 && isMoveStat(property)) {
      this.move[property] += 5;
      this.points -= 5;
    }
  }

  removePoint(property: AppStat): void {
    if (this.points < 60 && isMoveStat(property) && this.move[property] > 0) {
      this.move[property] -= 5;
      this.points += 5;
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {}
}
