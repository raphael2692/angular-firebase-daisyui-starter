import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FirestoreUser } from '../../models/user';

import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, CommonModule, ReactiveFormsModule, SectionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {

  user!: FirestoreUser;
  isLoading: boolean = true;
  isSubmittingData: boolean = false;
  isEditing: boolean = false;
  userProfileForm!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit() {

    this.auth.user.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
      this.initializeForm();
    });
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  initializeForm() {
    this.userProfileForm = this.fb.group({
      displayName: [this.user?.displayName, [Validators.required, Validators.minLength(6)]],
      photoURL: [this.user?.photoURL],

    });
  }

  get displayName() { return this.userProfileForm.get('displayName'); }


  displayValidationErrors(controlName: string): boolean | null {
    const control = this.userProfileForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  async onSubmit() {

    if (this.userProfileForm.valid) {
      if (this.user.id) {
        this.isSubmittingData = true
        await this.auth.updateUserProfile(this.user.id, this.userProfileForm.value).then(
          () => this.isSubmittingData = false
        )
      }

    } 
  }


  preventDefault(event: Event): void {
    event.preventDefault();
  }

}


