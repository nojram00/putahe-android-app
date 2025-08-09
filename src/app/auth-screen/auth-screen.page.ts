import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../services/fireauth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
  standalone: false
})
export class AuthScreenPage implements OnInit {

  day : 'day' | 'night' = 'day';
  greeting : string = 'Good Day';
  constructor(private fireauth: FireauthService, private router: Router, private firestore: FirestoreService) {

    // if(this.fireauth.checkAuth() != null){
    //   console.log('User is already logged in')
    //   this.router.navigate(['/'])
    // }
  }

  ngOnInit() {
    this.initializeDay();
    this.greeting = this.day === 'day' ? 'Good Day!' : 'Good Evening!';
  }

  initializeDay(){
    let hours = new Date().getHours();

    if(hours >= 7 && hours <= 19){
      this.day = 'day';
    }else{
      this.day = 'night';
    }
  }

  googleLogin(){
    this.fireauth.loginViaGoogle().then(user => {
      if(user.user.uid){
        const userData = this.firestore.find('users', user.user.uid)

        if(userData == null){
          this.firestore.createWithCustomId({email: user.user.email}, 'users', user.user.uid)
        }

        this.firestore.find('users', user.user.uid)

        this.router.navigate(['/'])
      }
    })
  }

  formRegistration(form: NgForm){
    const { email, password } = form.value
    this.fireauth.loginWithCreds(email, password).then(user => {
      if(user.user.uid){
        this.firestore.createWithCustomId({email: email, ...form.value}, 'users', user.user.uid)
      }
    })
  }

  checkUser(){
    const user = this.fireauth.checkAuth()
    if(user){
      alert(user.uid)
    }
    else {
      alert('No user')
    }
  }

}
