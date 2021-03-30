import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {AuthService} from '../shared/service/auth.service';
import { Location } from '@angular/common';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(event => {
      console.log(event);
    })
  }

  ngOnInit(): void { }

  getAvatar(): string {
    return this.authService.userData ? this.authService.userData.photoURL : '';
  }
}
