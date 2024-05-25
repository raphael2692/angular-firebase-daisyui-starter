import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { LoginComponent } from '../../routes/login/login.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LoginComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  @ViewChild('dropdown') dropdown: any;

  user: any
  isOpened: boolean = false
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

  toggleDropdown(){
    this.isOpened = !this.isOpened;
  }

}
