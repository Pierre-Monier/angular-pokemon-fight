import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../../../shared/model/pokemon/pokemon';
import { PokemonService } from '../../../shared/service/pokemon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {
  @Input() hero?: Pokemon;
  constructor(
    private route: ActivatedRoute,
    private heroService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getHero(parseInt(id, 10))
        .subscribe(hero => this.hero = hero);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
