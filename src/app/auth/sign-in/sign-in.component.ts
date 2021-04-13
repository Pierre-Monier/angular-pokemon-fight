import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  title = 'Angular Pokemon Fighter';

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/adventure']);
    }
  }
}
