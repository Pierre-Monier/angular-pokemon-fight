import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonDetailComponent } from './pokemon/component/pokemon-detail/pokemon-detail.component';
import { MoveComponent } from './move/move.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';

// TODO use a Guard to force the user to sign in
const routes: Routes = [
  { path: 'pokemons', component: PokemonComponent, canActivate: [AuthGuard] },
  { path: 'moves', component: MoveComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: PokemonDetailComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
