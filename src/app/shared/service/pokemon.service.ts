import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { MessageService } from './message.service';
import { Pokemon } from '../model/pokemon/pokemon';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { FormMode } from '../interface/form';
import {MoveService} from "./move.service";
import {Move} from "../model/move/move";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private db: AngularFirestore,
    private moveService: MoveService
  ) {}

  getPokemons(): Observable<Pokemon[]> {
    this.messageService.add('PokemonService: fetching pokemons');
    return this.db
      .collection<Pokemon>('/pokemon')
      .snapshotChanges()
      .pipe(
        map((pokemons) => {
          return pokemons
            .filter(
              (pokemonSnapshot) =>
                this.authService.userData &&
                pokemonSnapshot.payload.doc.data().userUid ===
                  this.authService.userData?.uid
            )
            .map((pokemonSnapshot) => {
              const data = pokemonSnapshot.payload.doc.data();
              return new Pokemon(pokemonSnapshot.payload.doc.id, data.name, data.userUid, data.type, data.pv, data.e, data.cc, data.movesIds);
            });
        }),
        map((toto) => {
          return toto;
        })
      );
  }

  getPokemon(id: string): Observable<Pokemon | undefined> {
    this.messageService.add(`PokemonService: fetched pokemon name=${id}`);

    return this.db
      .doc<Pokemon>(`/pokemon/${id}`)
      .snapshotChanges()
      .pipe(
        map((pokemonSnapshot) => {
          const data = pokemonSnapshot.payload.data();
          if (data) {
            const moves = undefined
            return new Pokemon(pokemonSnapshot.payload.id, data.name, data.userUid, data.type, data.pv, data.e, data.cc, moves)
          } else {
            console.error('No pokemon found');
            return undefined;
          }
        })
      );
  }

  private updatePokemon(pokemon: Pokemon): void {
    this.db
      .doc<Pokemon>(`/pokemon/${pokemon.id}`)
      .update(pokemon)
      .then(() => this.messageService.add('pokemon updated'))
      .catch((error) => console.error(error));
  }

  private addPokemon(pokemon: Pokemon): void {
    if (this.authService.userData) {
      pokemon.userUid = this.authService.userData.uid;
      this.db.collection<Pokemon>('/pokemon').add(pokemon);
    } else {
      console.error(
        'trying to add pokemon in collection but no user authenticated'
      );
    }
  }

  submitPokemon(type: FormMode, pokemon: Pokemon): void {
    if (type === 'create') {
      this.addPokemon(pokemon);
    } else {
      this.updatePokemon(pokemon);
    }
  }

  deletePokemon(id: string): void {
    this.db
      .doc<Pokemon>(`/pokemon/${id}`)
      .delete()
      .then(() => this.messageService.add('pokemon deleted'))
      .catch((error) => console.error(error));
  }
}
