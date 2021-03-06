import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Pokemon } from '../model/pokemon/pokemon';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private messageService: MessageService,
              private authService: AuthService,
              private db: AngularFirestore) { }

  getPokemons(): Observable<Pokemon[]> {
    this.messageService.add('PokemonService: fetching pokemons');
    return this.db.collection<Pokemon>('/pokemon').get().pipe(map(pokemons => {
      return pokemons.docs.filter((pokemonSnapshot) => this.authService.userData
        && pokemonSnapshot.data().userUid === this.authService.userData?.uid)
        .map((pokemonSnapshot) => {
        return {
          id: pokemonSnapshot.id,
          name: pokemonSnapshot.data().name,
          userUid: pokemonSnapshot.data().userUid
        };
      });
    }));
  }

  getPokemon(id: string): Observable<Pokemon | undefined> {
    this.messageService.add(`PokemonService: fetched pokemon name=${id}`);

    return this.db.doc<Pokemon>(`/pokemon/${id}`).get().pipe(map(pokemonSnapshot => {
      const data = pokemonSnapshot.data();
      if (data) {
        return {
          id: pokemonSnapshot.id,
          name: data.name,
          userUid: data.userUid
        };
      } else {
        console.error('No pokemon found');
        return undefined;
      }
    }));
  }

  updatePokemon(pokemon: Pokemon): void {
    this.db.doc<Pokemon>(`/pokemon/${pokemon.id}`).update(pokemon)
      .then(() => this.messageService.add('pokemon updated'))
      .catch((error) => console.error(error));
  }
}
