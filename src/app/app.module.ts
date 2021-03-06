import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListContainerComponent } from './pokemon/component/pokemon-list-container/pokemon-list-container.component';
import { PokemonFormContainerComponent } from './pokemon/component/pokemon-form-container/pokemon-form-container.component';
import { AdventureComponent } from './adventure/adventure-view/adventure.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './shared/service/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonListComponent } from './pokemon/component/pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon/component/pokemon-form/pokemon-form.component';
import { AddStatusComponent } from './shared/component/add-status/add-status.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TypesSelectorComponent } from './shared/component/types-selector/types-selector.component';
import { StatSelectorComponent } from './shared/component/stat-selector/stat-selector.component';
import { MoveListContainerComponent } from './move/component/move-list-container/move-list-container.component';
import { MoveListComponent } from './move/component/move-list/move-list.component';
import { MoveFormContainerComponent } from './move/component/move-form-container/move-form-container.component';
import { MoveFormComponent } from './move/component/move-form/move-form.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { AdventureContainerComponent } from './adventure/adventure-container/adventure-container.component';
import { GameViewComponent } from './game/component/game-view/game-view.component';
import { GameContainerComponent } from './game/component/game-container/game-container.component';
import { GameUserPokemonSelectorComponent } from './game/component/game-user-pokemon-selector/game-user-pokemon-selector.component';
import { GameDialogComponent } from './game/component/game-dialog/game-dialog.component';
import { GameEndComponent } from './game/component/game-end/game-end.component';
import { GameLoaderComponent } from './shared/component/game-loader/game-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListContainerComponent,
    PokemonFormContainerComponent,
    AdventureComponent,
    SignInComponent,
    NavbarComponent,
    PokemonListComponent,
    PokemonFormComponent,
    AddStatusComponent,
    PageNotFoundComponent,
    TypesSelectorComponent,
    StatSelectorComponent,
    MoveListContainerComponent,
    MoveListComponent,
    MoveFormContainerComponent,
    MoveFormComponent,
    LoaderComponent,
    AdventureContainerComponent,
    GameViewComponent,
    GameContainerComponent,
    GameUserPokemonSelectorComponent,
    GameDialogComponent,
    GameEndComponent,
    GameLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
