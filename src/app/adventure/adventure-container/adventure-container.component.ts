import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossService } from '../../shared/service/boss.service';
import { Subject } from 'rxjs';
import { Boss } from '../../shared/model/boss/boss';
import { takeUntil } from 'rxjs/operators';
import {AppUserService} from '../../shared/service/app-user.service';

@Component({
  selector: 'app-adventure-container',
  templateUrl: './adventure-container.component.html'
})
export class AdventureContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bosses: Boss[] = [];
  bossDefeatedByUser: string[] = [];

  constructor(private bossService: BossService, private appUserService: AppUserService) { }

  ngOnInit(): void {
    this.getBosses();

    const appUser = this.appUserService.getCurrentAppUser();
    if (appUser) {
      this.bossDefeatedByUser = appUser.bossesDefeated;
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
