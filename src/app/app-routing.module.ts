import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListContainerComponent } from './pokemon/component/pokemon-list-container/pokemon-list-container.component';
import { PokemonFormContainerComponent } from './pokemon/component/pokemon-form-container/pokemon-form-container.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MoveListContainerComponent } from './move/component/move-list-container/move-list-container.component';
import { MoveFormContainerComponent } from './move/component/move-form-container/move-form-container.component';
import {DashboardContainerComponent} from './dashboard/dashboard-container/dashboard-container.component';

const routes: Routes = [
  {
    path: 'pokemons',
    component: PokemonListContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'moves',
    component: MoveListContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'pokemon/:id',
    component: PokemonFormContainerComponent,
    data: { type: 'update' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-pokemon',
    component: PokemonFormContainerComponent,
    data: { type: 'create' },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-move',
    component: MoveFormContainerComponent,
    data: { type: 'create' },
    canActivate: [AuthGuard],
  },
  {
    path: 'move/:id',
    component: MoveFormContainerComponent,
    data: { type: 'update' },
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
