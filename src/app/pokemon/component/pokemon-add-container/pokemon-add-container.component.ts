import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../../../shared/model/pokemon/pokemon';
import {PokemonService} from '../../../shared/service/pokemon.service';
import {Location} from '@angular/common';
import {FormMode} from '../../../shared/model/form-mode/form-mode';
import {FormService} from '../../../shared/service/form.service';

@Component({
  selector: 'app-pokemon-add-container',
  templateUrl: './pokemon-add-container.component.html'
})
export class PokemonAddContainerComponent implements OnInit {
  // init an empty pokemon to fill up with form
  pokemon: Pokemon = {
    id: '',
    name: '',
    userUid: ''
  };
  formMode = FormMode.Create;

  constructor(private pokemonService: PokemonService, private location: Location, private formService: FormService) { }

  ngOnInit(): void {
  }

  addPokemon(pokemon: Pokemon): void {
    if (this.formService.isFormValid(pokemon)) {
      this.pokemonService.addPokemon(pokemon);
      this.goBack();
    } else {
      console.error('Trying to add an empty pokemon');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
