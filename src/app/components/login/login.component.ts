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

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.auth.loginWithGooglePopUp().then(
      () => this.router.navigate(['/'])
    )
  }

  // login() {
  //   this.auth.loginWithGooglePopUp()
  // }


}
