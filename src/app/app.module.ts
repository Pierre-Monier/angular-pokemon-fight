import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonContainerComponent } from './pokemon/component/pokemon-container/pokemon-container.component';
import { PokemonDetailContainerComponent } from './pokemon/component/pokemon-detail-container/pokemon-detail-container.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoveComponent } from './move/move.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './shared/service/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonListComponent } from './pokemon/component/pokemon-list/pokemon-list.component';
import { PokemonDetailFormComponent } from './pokemon/component/pokemon-detail-form/pokemon-detail-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonContainerComponent,
    PokemonDetailContainerComponent,
    MessageComponent,
    DashboardComponent,
    MoveComponent,
    SignInComponent,
    NavbarComponent,
    PokemonListComponent,
    PokemonDetailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
