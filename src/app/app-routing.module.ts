import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListContainerComponent } from './pokemon/component/pokemon-list-container/pokemon-list-container.component';
import { PokemonFormContainerComponent } from './pokemon/component/pokemon-form-container/pokemon-form-container.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MoveListContainerComponent } from './move/component/move-list-container/move-list-container.component';
import { MoveFormContainerComponent } from './move/component/move-form-container/move-form-container.component';
import {AdventureContainerComponent} from './adventure/adventure-container/adventure-container.component';
import {GameComponent} from './game/game.component';

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
    path: 'adventure',
    component: AdventureContainerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'pokemons/:id',
    component: PokemonFormContainerComponent,
    data: { type: 'update' },
    canActivate: [AuthGuard],
  },
  {
    path: 'pokemons-add',
    component: PokemonFormContainerComponent,
    data: { type: 'create' },
    canActivate: [AuthGuard],
  },
  {
    path: 'moves-add',
    component: MoveFormContainerComponent,
    data: { type: 'create' },
    canActivate: [AuthGuard],
  },
  {
    path: 'moves/:id',
    component: MoveFormContainerComponent,
    data: { type: 'update' },
    canActivate: [AuthGuard],
  },
  {
    path: 'game',
    component: GameComponent,
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
