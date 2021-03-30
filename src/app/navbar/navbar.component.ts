import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {AuthService} from '../shared/service/auth.service';
import { Location } from '@angular/common';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  dashboardImage = "assets/dashboard-navbar-image.png";
  movesImage = "assets/moves-navbar-image.jpg";
  pokemonImage = "assets/pokemons-navbar-image.jpg";

  currentRoute = "/dashboard";

  constructor(public authService: AuthService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url
      }
    })
  }

  ngOnInit(): void { }

  getAvatar(): string {
    return this.authService.userData ? this.authService.userData.photoURL : '';
  }

  getNavbarImage(): string {
    if (this.currentRoute.includes("/moves")) {
      return this.movesImage;
    } else if (this.currentRoute.includes("/pokemon")) {
      return this.pokemonImage;
    } else {
      return this.dashboardImage;
    }
  }
}
