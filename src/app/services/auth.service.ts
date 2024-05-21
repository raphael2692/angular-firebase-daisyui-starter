import { Injectable } from '@angular/core';
import { GoogleAuthProvider, Auth, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user$.next(JSON.parse(storedUser));
    }
  }

  private provider = new GoogleAuthProvider();
  private user$ = new BehaviorSubject(<any>null)

  user = this.user$.asObservable()


  async loginWithGooglePopUp() {

    signInWithPopup(this.auth, this.provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          const token = credential.accessToken;
          console.log(token)
          localStorage.setItem('token', JSON.stringify(token))

        }
        const user = result.user;
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
        this.user$.next(user)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log({ 'errorCode': errorCode, 'errorMessage': errorMessage, 'email': email, 'credential': credential })
      });
  }

  async logout() {

    this.user$.next(false)
    localStorage.clear()

  }

}
