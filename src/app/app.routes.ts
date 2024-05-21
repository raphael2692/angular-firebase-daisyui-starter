import { Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'settings', component: SettingsComponent },
    {path: 'profile', component: ProfileComponent}
];
