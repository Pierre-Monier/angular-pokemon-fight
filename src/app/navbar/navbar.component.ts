import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import {AppUserService} from '../shared/service/app-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, public appUserService: AppUserService) {}

  ngOnInit(): void {}

  getAvatar(): string {
    const currentUser = this.appUserService.getCurrentAppUser();
    return currentUser ? currentUser.photoURL : '';
  }
}
