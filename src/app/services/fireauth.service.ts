import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private auth: Auth, private firestore: FirestoreService) { }

  loginViaGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
  }

  loginWithCreds(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  registerWithCreds(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    return this.auth.signOut()
  }

  checkAuth(){
    return this.auth.currentUser
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
