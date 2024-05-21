import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})


export class LogoutComponent {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.logout().then(
      () => this.router.navigate(['/'])
    )
  }
}
