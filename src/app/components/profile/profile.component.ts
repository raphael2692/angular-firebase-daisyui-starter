import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {

  user: any

  constructor(private auth: AuthService) { }


  ngOnInit() {
    this.auth.user.subscribe(
      (user) => this.user = user
    )
  }

}
