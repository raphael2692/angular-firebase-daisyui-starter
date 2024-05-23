import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  user: any
  load: boolean = false

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.user.subscribe(
      (user) => {
        if (!user) {
          this.load = true;
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
