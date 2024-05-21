import { Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'profile', component: ProfileComponent}
];
