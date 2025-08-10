import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private auth: Auth, private firestore: FirestoreService) { }

  loginViaGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
  }

  mobileLoginViaGoogle(){
    return FirebaseAuthentication.signInWithGoogle();
  }

  loginViaGoogleRedirect(){
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(this.auth, provider)
  }

  loginWithCreds(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  registerWithCreds(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    return this.auth.signOut()
  }

  checkAuth(){
    return this.auth.currentUser
  }

  async handleRedirect(){
    return await getRedirectResult(this.auth)
  }

  waitForAuth(): Promise<void> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve();
      });
    });
  }
}
