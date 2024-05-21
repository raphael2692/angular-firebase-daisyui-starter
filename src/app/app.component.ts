import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-daisy-firebase';
  user: any
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(
      (user) => this.user = user
    )
  }
}
