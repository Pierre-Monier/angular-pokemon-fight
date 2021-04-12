import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon/pokemon';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormMode } from '../interface/form';
import firebase from 'firebase';
import { AppUserService } from './app-user.service';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private appUser: AppUserService, private db: AngularFirestore) {}

  getPokemons(userId?: string): Observable<Pokemon[]> {
    return this.db
      .collection<Pokemon>('/pokemon')
      .snapshotChanges()
      .pipe(
        map((pokemons) => {
          // if we specify a userId we get this specific user pokemons
          // else we get the current logged user pokemons
          const currentUser = userId ?? this.appUser.getCurrentAppUser()?.uid;
          return pokemons
            .filter(
              (pokemonSnapshot) =>
                currentUser &&
                pokemonSnapshot.payload.doc.data().userUid === currentUser
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
        })
      );
  }

  getPokemon(id: string): Observable<Pokemon | undefined> {
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

  private updatePokemon(pokemon: Pokemon): Promise<void> {
    return this.db
      .doc<Pokemon>(`/pokemon/${pokemon.id}`)
      .update(Object.assign({}, pokemon));
  }

  private addPokemon(
    pokemon: Pokemon,
    userUid: string
  ): Promise<DocumentReference<Pokemon>> {
    pokemon.userUid = userUid;
    // we need to pass a native js Object to make the Add operation works
    // https://stackoverflow.com/questions/48156234/function-documentreference-set-called-with-invalid-data-unsupported-field-val
    return this.db
      .collection<Pokemon>('/pokemon')
      .add(Object.assign({}, pokemon));
  }

  submitPokemon(
    type: FormMode,
    pokemon: Pokemon
  ): Promise<DocumentReference<Pokemon> | void> {
    // we don't want to store Move object on firebase
    pokemon.moves = [];
    const currentUser = this.appUser.getCurrentAppUser();
    const userUid = currentUser ? currentUser.uid : 'unknown';

    if (type === 'create') {
      return this.addPokemon(pokemon, userUid);
    } else {
      return this.updatePokemon(pokemon);
    }
  }

  deletePokemon(id: string): Promise<void> {
    return this.db
      .doc<Pokemon>(`/pokemon/${id}`)
      .delete()
      .catch((error) => console.error(error));
  }
}
