import {Component, OnDestroy, OnInit} from '@angular/core';
import {BossService} from '../../shared/service/boss.service';
import {Subject} from 'rxjs';
import {Boss} from '../../shared/model/boss/boss';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bosses: Boss[] = [];

  constructor(private bossService: BossService) { }

  ngOnInit(): void {
    this.getBosses();
  }

  getBosses(): void {
    this.bossService.getBosses().pipe(takeUntil(this.destroy$)).subscribe((bosses) => {
      this.bosses = bosses;
    });
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
