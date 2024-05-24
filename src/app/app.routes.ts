import { Routes } from '@angular/router';

import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { PlaygroundComponent } from './routes/playground/playground.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'profile', component: ProfileComponent},
    {path: 'play', component: PlaygroundComponent}
];
