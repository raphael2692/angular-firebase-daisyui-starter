import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LoginComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  user: any
  constructor(private auth: AuthService) { }


  ngOnInit() {
    this.auth.user.subscribe(
      (user) => { this.user = user }

    )
  }

  logout() {
    this.auth.logout().then(
      () => console.log('User logged out')
    )
  }
}
