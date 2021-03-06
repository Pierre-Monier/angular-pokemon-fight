import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';
import {ToastrService} from 'ngx-toastr';

import {FormContainer, FormMode} from '../../../shared/interface/form';
import {Pokemon, pokemonSpec} from '../../../shared/model/pokemon/pokemon';
import {PokemonService} from '../../../shared/service/pokemon.service';
import {FormService} from '../../../shared/service/form.service';
import {ElemantaryType, elemantaryTypeToArray,} from '../../../shared/model/elemantary-type/elemantary-type';
import {AppStat} from '../../../shared/interface/app-stat';
import {MoveService} from '../../../shared/service/move.service';
import {Move} from '../../../shared/model/move/move';
import {AngularFireStorage, AngularFireUploadTask,} from '@angular/fire/storage';

@Component({
  selector: 'app-pokemon-form-container',
  templateUrl: './pokemon-form-container.component.html',
})
export class PokemonFormContainerComponent
  implements OnInit, OnDestroy, FormContainer {
  private destroy$ = new Subject<void>();
  pokemon = Pokemon.defaultPokemon();
  elemantaryTypes = elemantaryTypeToArray();
  points = pokemonSpec.maxPoints;
  type: FormMode;
  currentMoves?: Move[];
  allMoves?: Move[];
  avatarFile?: File;
  isLoading = false;
  successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private moveService: MoveService,
    private location: Location,
    private formService: FormService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    const { type } = this.route.snapshot.data;
    this.type = type;
    this.successMessage =
      this.type === 'create'
        ? 'le pokemon à été crée avec succes'
        : 'le pokemon à été mis à jour';
  }

  ngOnInit(): void {
    if (this.type === 'update') {
      const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
      this.initUpdateForm(pokemonId);
    } else if (this.type !== 'create') {
      this.toastr.error('Le formulaire ne supporte pas ce type de valeur');
      console.error('Trying to create a form with the wrong type');
    }

    this.getMovesData();
  }

  initUpdateForm(pokemonId: string | null): void {
    if (pokemonId) {
      this.pokemonService
        .getPokemon(pokemonId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((pokemon) => {
          if (pokemon) {
            this.pokemon = pokemon;
            // we update the current points base on the existing pokemon
            this.updatePoints();

            this.moveService
              .getMoves(this.pokemon.movesIds)
              .pipe(takeUntil(this.destroy$))
              .subscribe((moves) => {
                this.pokemon.moves = moves;
              });
          } else {
            this.toastr.error(
              'Le pokemon que vous essayer d éditer néxiste pas'
            );
            this.type = 'create';
          }
        });
    } else {
      console.error('Trying to edit a pokemon without specifying a id');
      this.toastr.error(
        'Le pokemon que vous essayer déditer néxiste pas, ajouter un id dans l url'
      );
    }
  }

  getMovesData(): void {
    this.moveService
      .getMoves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((moves) => {
        this.allMoves = moves;
        this.currentMoves = this.filterMoves();
      });
  }

  async submit(pokemon: Pokemon): Promise<void> {
    if (this.formService.isPokemonFormValid(pokemon)) {
      this.isLoading = true;

      if (this.avatarFile) {
        await this.uploadAvatarFile()
          .then(async (data) => {
            const imageRef = this.pokemon.isImageUrlDefault()
              ? undefined
              : this.afStorage.ref(this.pokemon.getImageRef());

            if (imageRef) {
              imageRef.delete();
            }

            this.pokemon.imageUrl = await data.ref.getDownloadURL();
          })
          .catch((err) => {
            console.error(err);
            this.toastr.error(
              'Il y a eu un problème lors de l upload de l image, veuillez reessayer'
            );
          });
      }

      this.pokemonService
        .submitPokemon(this.type, pokemon)
        .then(() => {
          this.toastr.success(this.successMessage);
          this.goBack();
        })
        .catch((err) => {
          console.error(err);
          this.toastr.error('Problème lors de l envoie des données');
        });
    } else {
      this.isLoading = false;
      this.toastr.error(this.formService.getErrorMessage(pokemon));
    }
  }

  uploadAvatarFile(): AngularFireUploadTask {
    const ref = this.afStorage.ref(uuidv4());
    return ref.put(this.avatarFile);
  }

  setAvatarFile(file: File): void {
    this.avatarFile = file;
  }

  filterMoves(): Move[] | undefined {
    return this.allMoves?.filter(
      (move) =>
        ElemantaryType[move.type] === this.pokemon.type ||
        ElemantaryType[move.type] === ElemantaryType.Neutre
    );
  }

  updatePoints(): void {
    this.points = pokemonSpec.maxPoints - this.pokemon.getStatPoint();
  }

  addPoint(property: AppStat): void {
    if (this.points > 0 && Pokemon.isPokemonStat(property)) {
      this.pokemon[property] += 5;
      this.points -= 5;
    }
  }

  removePoint(property: AppStat): void {
    if (
      this.points < 60 &&
      Pokemon.isPokemonStat(property) &&
      this.pokemon[property] > 0
    ) {
      this.pokemon[property] -= 5;
      this.points += 5;
    }
  }

  goBack(): void {
    this.location.back();
  }

  handleTypeChange(): void {
    this.currentMoves = this.filterMoves();
  }

  handleMovesChange(): void {
    while (this.pokemon.movesIds.length > 3) {
      this.pokemon.movesIds.shift();
    }
  }

  ngOnDestroy(): void {
    // emit an event to clean up the this.pokemonService.getPokemon() Observable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
