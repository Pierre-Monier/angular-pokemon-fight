import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Pokemon } from '../model/pokemon/pokemon';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { FormMode } from '../interface/form';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private db: AngularFirestore
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
              return {
                id: pokemonSnapshot.payload.doc.id,
                name: pokemonSnapshot.payload.doc.data().name,
                userUid: pokemonSnapshot.payload.doc.data().userUid,
                type: ElemantaryType[pokemonSnapshot.payload.doc.data().type],
                pv: pokemonSnapshot.payload.doc.data().pv,
                e: pokemonSnapshot.payload.doc.data().e,
                cc: pokemonSnapshot.payload.doc.data().cc,
              };
            });
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
            return {
              id: pokemonSnapshot.payload.id,
              name: data.name,
              userUid: data.userUid,
              type: ElemantaryType[data.type],
              pv: data.pv,
              e: data.e,
              cc: data.cc,
            };
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
