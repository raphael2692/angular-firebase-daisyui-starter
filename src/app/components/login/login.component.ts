import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  user: any
  isLoading: boolean = true

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.user.subscribe(
      (user) => {
        if (!user) {
          this.isLoading = false;
        }
        else {
          this.router.navigate(['/'])
        }
      }
    )
  }

  login() {
    this.auth.login().then(
      () => this.router.navigate(['/'])
    )
  }
}
