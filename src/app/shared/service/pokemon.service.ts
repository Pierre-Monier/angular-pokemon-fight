import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Pokemon } from '../model/pokemon/pokemon';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
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
              const data = pokemonSnapshot.payload.doc.data();
              return new Pokemon(
                pokemonSnapshot.payload.doc.id,
                data.name,
                data.userUid,
                data.type,
                data.pv,
                data.e,
                data.cc,
                data.imageUrl,
                data.movesIds
              );
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
            return new Pokemon(
              pokemonSnapshot.payload.id,
              data.name,
              data.userUid,
              data.type,
              data.pv,
              data.e,
              data.cc,
              data.imageUrl,
              data.movesIds
            );
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
      .update(Object.assign({}, pokemon))
      .then(() => this.messageService.add('pokemon updated'))
      .catch((error) => console.error(error));
  }

  private addPokemon(pokemon: Pokemon): void {
    if (this.authService.userData) {
      pokemon.userUid = this.authService.userData.uid;
      // we need to pass a native js Object to make the Add operation works
      // https://stackoverflow.com/questions/48156234/function-documentreference-set-called-with-invalid-data-unsupported-field-val
      this.db.collection<Pokemon>('/pokemon').add(Object.assign({}, pokemon));
    } else {
      console.error(
        'trying to add pokemon in collection but no user authenticated'
      );
    }
  }

  submitPokemon(type: FormMode, pokemon: Pokemon): void {
    // we don't want to store Move object on firebase
    pokemon.moves = [];

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
