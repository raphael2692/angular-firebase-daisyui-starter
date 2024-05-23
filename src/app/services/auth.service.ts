import { Injectable } from '@angular/core';
import { GoogleAuthProvider, Auth, signInWithPopup, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { FirestoreUser } from '../models/user';
import { FirestoreService } from './firestore.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private provider = new GoogleAuthProvider();

  private user$ = new BehaviorSubject<any>(null);
  user = this.user$.asObservable();

  constructor(private auth: Auth, private store: FirestoreService) {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      console.log('Reading user from local storage', localUser);
      this.user$.next(JSON.parse(localUser));
    }
  }

  private handleError(error: any): void {
    const { code, message, customData } = error;
    console.error('Error:', { code, message, email: customData?.email });
    throw error;
  }

  async setOrCreateUser(user: User) {
    try {
      console.log('Searching for user with email', user.email);
      const userInStore = await this.store.getDocumentSnapByField('users', 'email', user.email);
      if (userInStore) {
        console.log('User exist in store')
        const userDocSnap = await this.store.getDocumentSnap('users', userInStore.id);
        const fetchedUser: FirestoreUser = {
          id: userInStore.id,
          email: userDocSnap?.['email'],
          displayName: userDocSnap?.['displayName'],
          photoURL: userDocSnap?.['photoURL'],
          createdAt: userDocSnap?.['createdAt'],
        };

        localStorage.setItem('user', JSON.stringify(fetchedUser));
        this.user$.next(fetchedUser);
        console.log('Logged as user',fetchedUser.id, fetchedUser.email )

      } else {
        console.log('Provisioning user...')
        const newUserData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: Date.now(),
        };

        const newUserRef = await this.store.addDocument('users', newUserData);
        if (newUserRef) {
          const newUser = {
            id: newUserRef.id,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: Date.now(),
          };

          localStorage.setItem('user', JSON.stringify(newUser));
          this.user$.next(newUser);
          console.log('User provisioned')
          await this.initializeUserData(newUser);
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async initializeUserData(newUser: FirestoreUser) {
    try {
      const userData = await this.store.getDocumentSnapByField('userData', 'userId', newUser.id);
      console.log('Reading existing user data');
      if (!userData) {
        await this.store.addDocument('userData', { 'userId': newUser.id, 'lastUpdate': Date.now() });
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async loginWithGooglePopUp() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
      }
      const user: User = result.user;
      console.log('Logging as user', user);
      await this.setOrCreateUser(user);

    } catch (error) {
      this.handleError(error);
    }
  }



  async logout() {
    try {
      this.user$.next(false);
      await this.auth.signOut();
      localStorage.clear();

    } catch (error) {
      this.handleError(error);
    }
  }

  async login() {
    await this.loginWithGooglePopUp();
  }

  async updateUserProfile(userId: string, userData: any) {
    try {
      console.log('Updating user profile data');
      await this.store.updateDocument('users', userId, userData);
      console.log('User updated successfully');
      const updatedUser = {
        id: userId,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        createdAt: userData.createdAt,
      };
      this.user$.next(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      this.handleError(error);
    }
  }
}