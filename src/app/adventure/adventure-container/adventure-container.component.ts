import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossService } from '../../shared/service/boss.service';
import { Subject } from 'rxjs';
import { Boss } from '../../shared/model/boss/boss';
import { AppUserService } from '../../shared/service/app-user.service';
import { PokemonService } from '../../shared/service/pokemon.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-adventure-container',
  templateUrl: './adventure-container.component.html',
})
export class AdventureContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bosses: Boss[] = [];
  bossDefeatedByUser: string[] = [];
  isUserHavingPokemon?: boolean;

  constructor(
    private bossService: BossService,
    private appUserService: AppUserService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getBosses();
    this.getUserData();
  }

  getUserData(): void {
    const appUser = this.appUserService.getCurrentAppUser();
    if (appUser) {
      this.bossDefeatedByUser = appUser.bossesDefeated;
      // subscribing to see if user as pokemons so he can play
      this.pokemonService
        .getPokemons()
        .pipe(takeUntil(this.destroy$))
        .subscribe((pokemons) => {
          this.isUserHavingPokemon = pokemons.length > 0;
        });
    }
  }

  getBosses(): void {
    this.bossService
      .getBosses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((bosses) => {
        this.bosses = bosses;
      });
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
