import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {

  user: any
  load: boolean = false
  constructor(private auth: AuthService) { }


  ngOnInit() {
    this.auth.user.subscribe(
      (user) => {this.user = user; this.load = true}
    )
  }

}
