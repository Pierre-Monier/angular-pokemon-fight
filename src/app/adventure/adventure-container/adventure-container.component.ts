import { Component, OnDestroy, OnInit } from '@angular/core';
import { BossService } from '../../shared/service/boss.service';
import { Subject } from 'rxjs';
import { Boss } from '../../shared/model/boss/boss';
import {AppUserService} from '../../shared/service/app-user.service';
import {PokemonService} from '../../shared/service/pokemon.service';

@Component({
  selector: 'app-adventure-container',
  templateUrl: './adventure-container.component.html'
})
export class AdventureContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bosses: Boss[] = [];
  bossDefeatedByUser: string[] = [];
  userNbrPokemon = 0;

  constructor(private bossService: BossService, private appUserService: AppUserService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getBosses();

    const appUser = this.appUserService.getCurrentAppUser();
    if (appUser) {
      this.bossDefeatedByUser = appUser.bossesDefeated;
      this.getUserPokemons();
    }
  }

  getBosses(): void {
    this.bossService.getBosses().toPromise().then((bosses) => this.bosses = bosses);
  }

  getUserPokemons(): void {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      if (pokemons) {
        this.userNbrPokemon = pokemons.length;
      }
    });
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemons() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
