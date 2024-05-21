import { Injectable } from '@angular/core';
import { GoogleAuthProvider, Auth, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private store: Firestore) {
    // get user from localstorage if it exists
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Reading user from local storage', storedUser)
      this.user$.next(JSON.parse(storedUser));
    }
  }

  private provider = new GoogleAuthProvider();
  private user$ = new BehaviorSubject(<any>null)
  // private userRef$ = new BehaviorSubject(<any>null)
  // this is used to access user data and protect routes across all app
  user = this.user$.asObservable()
  // userRef = this.userRef$.asObservable()

  async getOrCreateUser(user: any) {

    // get users collection
    const usersCollection = collection(this.store, 'users');
    // build a query 
    const q = query(usersCollection, where('email', '==', user.email));


    try {
      const querySnapshot = await getDocs(q);

      // get user in collection with the same email as logged user from google SSO
      if (querySnapshot.size === 1) {

        const userDocument = querySnapshot.docs[0];
        const userDocumentData = userDocument.data()
        // reference is needed to retrieve related collections and reference user in others (!)
        const user = { 'id': userDocument.id, 'data': userDocumentData, 'ref': userDocument.ref }
        console.log('User exists', user)
        localStorage.setItem('user', JSON.stringify(user))
        this.user$.next(user)
        // if logged user do not exist in firebase collection, create it
      } else if (querySnapshot.size === 0) {
        try {
          const userData = {
            'email': user.email,
            'photoURL': user.photoURL,
            'displayName': user.displayName,
            'createdAt': Date.now()
          }
          await addDoc(usersCollection, userData)
            // retrieve created firestore doc id (document reference)
            .then(
              (userRef) => {

                console.log('User created with id:', userRef.id)
                console.log(userRef)
                const user = { 'id': userRef.id, 'data': userData, 'docRef': userRef }
                localStorage.setItem('user', JSON.stringify(user))
                this.user$.next(user)
                // init userData
                this.initializeUserData(userRef)
              }
            )

        } catch (e) {
          console.error('Error creating user:', e);
        }
      } else {
        console.error('Expected 0 or 1 document, but found', querySnapshot.size);
      }
    } catch (e) {
      console.error('Error getting documents: ', e);
    }
  }

  async initializeUserData(userRef: any) {
    const userDataCollection = collection(this.store, 'userData');
    const q = query(userDataCollection, where('userId', '==', userRef));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        const userData = { 'lastUpdated': Date.now(), 'userId': userRef }
        await addDoc(userDataCollection, userData)
          .then(
            () => console.log('Initialize userData')
          )
      }
    } catch (error) {
      console.log(error)
    }

  }

  async loginWithGooglePopUp() {

    signInWithPopup(this.auth, this.provider)
      .then((result) => {

        // getting user data from SSO
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          const token = credential.accessToken;
          // localStorage.setItem('token', JSON.stringify(token))
        }
        const user = result.user;

        console.log('Logging as user', user)

        this.getOrCreateUser(user)


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
