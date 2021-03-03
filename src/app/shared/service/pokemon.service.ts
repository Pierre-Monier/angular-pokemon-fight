import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../message/service/message.service';
import { Pokemon } from '../model/pokemon/pokemon';
import { POKEMONS } from '../model/pokemon/mock-pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Pokemon[]> {
    const heroes = of(POKEMONS);
    this.messageService.add('PokemonService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Pokemon | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(POKEMONS.find(hero => hero.id === id));
  }
}
