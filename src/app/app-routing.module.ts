import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonDetailComponent } from './pokemon/component/pokemon-detail/pokemon-detail.component';
import { MoveComponent } from './move/move.component';

// TODO use a Guard to force the user to sign in
const routes: Routes = [
  { path: 'pokemons', component: PokemonComponent },
  { path: 'moves', component: MoveComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
