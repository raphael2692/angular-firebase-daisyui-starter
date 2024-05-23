import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {

  user: any
  load: boolean = false
  edit: boolean = false
  userProfileForm!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.auth.user.subscribe(
      (user) => {

        this.user = user
        this.load = true;
        this.initializeForm();
      })

  }

  toggleEdit() {
    this.edit = !this.edit;

  }
  initializeForm() {
    this.userProfileForm = this.fb.group(
      {
        displayName: [this.user.displayName],
        email: [this.user.email],
        photoURL: [this.user.photoURL]
      }
    )

  }
  onSubmit() {
    if (this.userProfileForm.valid) {
      // console.log(this.userProfileForm.value);
      this.auth.updateUserProfile(this.user.id, this.userProfileForm.value)
    }
  }

}
