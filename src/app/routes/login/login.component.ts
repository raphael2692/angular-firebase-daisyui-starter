import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SectionComponent } from '../../components/section/section.component';
import { LoaderComponent } from '../../components/loader/loader.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SectionComponent, LoaderComponent],
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
    this.isLoading = true
    this.auth.login().then(
      () => {this.router.navigate(['/']); this.isLoading = false}
    )
  }
}
