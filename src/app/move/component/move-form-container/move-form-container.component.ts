import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormContainer, FormMode } from '../../../shared/interface/form';
import {
  defaultMove,
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
  successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private moveService: MoveService,
    private location: Location,
    private formService: FormService,
    private toastr: ToastrService
  ) {
    const { type } = this.route.snapshot.data;
    this.type = type;
    this.successMessage =
      this.type === 'create'
        ? 'le move à été crée avec succes'
        : 'le move à été mis à jour';
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
        this.toastr.error(
          'Le move que vous essayer déditer néxiste pas, ajouter un id dans l url'
        );
      }
    } else if (this.type !== 'create') {
      this.toastr.error('Le formulaire ne supporte pas ce type de valeur');
      console.error('Trying to create a form with the wrong type');
    }
  }

  submit(move: Move): void {
    if (this.formService.isMoveFormValid(move)) {
      this.moveService
        .submitMove(this.type, move)
        .then(() => {
          this.toastr.success(this.successMessage);
          this.goBack();
        })
        .catch((err) => {
          console.error(err);
          this.toastr.error('Problème lors de l envoie des données');
        });
    } else {
      this.toastr.error(this.formService.getErrorMessage(move));
    }
  }

  updatePoints(): void {
    this.points = moveSpec.maxPoints - this.move.getStatPoint();
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
