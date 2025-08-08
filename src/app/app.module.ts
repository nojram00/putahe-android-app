import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "putahe-mobile-app", appId: "1:76973339049:web:8afabdbbfa612083ab14b8", storageBucket: "putahe-mobile-app.firebasestorage.app", apiKey: "AIzaSyA9cGKw8nosWFIY9lafNdseradEaStUZJE", authDomain: "putahe-mobile-app.firebaseapp.com", messagingSenderId: "76973339049" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
})
export class AppModule {}
