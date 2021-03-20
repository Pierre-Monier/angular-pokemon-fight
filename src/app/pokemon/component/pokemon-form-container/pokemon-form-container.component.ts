import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { FormContainer, FormMode } from '../../../shared/interface/form';
import {
  defaultPokemon,
  getPokemonStatPoint,
  Pokemon,
  pokemonSpec,
} from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';
import { FormService } from '../../../shared/service/form.service';
import { elemantaryTypeToArray } from '../../../shared/model/elemantary-type/elemantary-type';
import { AppStat } from '../../../shared/interface/app-stat';
import { MoveService } from '../../../shared/service/move.service';
import { Move } from '../../../shared/model/move/move';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
  selector: 'app-pokemon-form-container',
  templateUrl: './pokemon-form-container.component.html',
})
export class PokemonFormContainerComponent
  implements OnInit, OnDestroy, FormContainer {
  private destroy$ = new Subject<void>();
  pokemon = defaultPokemon;
  elemantaryTypes = elemantaryTypeToArray();
  points = pokemonSpec.maxPoints;
  type: FormMode;
  moves?: Move[];
  avatarFile?: File;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private moveService: MoveService,
    private location: Location,
    private formService: FormService,
    private afStorage: AngularFireStorage
  ) {
    const { type } = this.route.snapshot.data;
    this.type = type;
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.moveService
      .getMoves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moves) => {
        this.moves = moves;
      });

    if (this.type === 'update') {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pokemonService
          .getPokemon(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((pokemon) => {
            if (pokemon) {
              this.pokemon = pokemon;
              // we update the current points base on the existing pokemon
              this.updatePoints();

              if (this.pokemon.movesIds) {
                this.moveService
                  .getMoves(this.pokemon.movesIds)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((moves) => {
                    this.pokemon.moves = moves;
                  });
              }
            }
          });
      } else {
        console.error('Trying to edit a pokemon without specifying a id');
      }
    } else if (this.type !== 'create') {
      console.error('Trying to create a form with the wrong type');
    }
  }

  async submit(pokemon: Pokemon): Promise<void> {
    console.log(this.avatarFile);
    if (this.formService.isPokemonFormValid(pokemon)) {
      this.isLoading = true;

      if (this.avatarFile) {
        await this.uploadAvatarFile()
          .then(async (data) => {
          this.pokemon.imageUrl = await data.ref.getDownloadURL();
          })
          .catch((err) => console.error(err));
      }

      this.pokemonService.submitPokemon(this.type, pokemon);
      this.goBack();
    } else {
      console.error('Trying to submit pokemon with wrong values');
    }
  }

  uploadAvatarFile(): AngularFireUploadTask {
    const ref = this.afStorage.ref(uuidv4());
    return ref.put(this.avatarFile);
  }

  setAvatarFile(file: File): void {
    this.avatarFile = file;
  }

  updatePoints(): void {
    this.points = pokemonSpec.maxPoints - getPokemonStatPoint(this.pokemon);
  }

  addPoint(property: AppStat): void {
    if (this.points > 0) {
      this.pokemon[property] += 5;
      this.points -= 5;
    }
  }

  removePoint(property: AppStat): void {
    if (this.points < 60 && this.pokemon[property] > 0) {
      this.pokemon[property] -= 5;
      this.points += 5;
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemon() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
