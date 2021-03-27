import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossService } from '../../shared/service/boss.service';
import { Subject } from 'rxjs';
import { Boss } from '../../shared/model/boss/boss';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bosses: Boss[] = [];
  bossDefeatedByUser: string[] = [];

  constructor(private bossService: BossService) { }

  ngOnInit(): void {
    this.getBosses();

    // for some reason we can't access the AppUser data in this component from the authService
    // So we get it from the localStorage
    const appUser = localStorage.getItem('user');
    if (appUser) {
      this.bossDefeatedByUser = JSON.parse(appUser).bossesDefeated;
    }
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
