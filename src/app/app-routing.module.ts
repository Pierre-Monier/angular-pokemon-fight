import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonContainerComponent } from './pokemon/component/pokemon-container/pokemon-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonDetailContainerComponent } from './pokemon/component/pokemon-detail-container/pokemon-detail-container.component';
import { MoveComponent } from './move/move.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'pokemons', component: PokemonContainerComponent, canActivate: [AuthGuard] },
  { path: 'moves', component: MoveComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: PokemonDetailContainerComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
