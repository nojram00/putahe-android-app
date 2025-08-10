import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';
import { User } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user$ : any | null = null
  constructor(private router: Router, private fireauth: FireauthService, private platform: Platform) {}

  ngOnInit() {
    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileCheckAuth().then((result) => {
        this.user$ = result.user
      })
    }else{
      this.user$ = this.fireauth.checkAuth()
    }

    console.log("User: ", this.user$);
  }

  logout(){
    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileLogout().then(() => {
        this.router.navigate(['/auth-screen'])
      })
    }
    else
    {
      this.fireauth.logout().then(() => {
        this.router.navigate(['/auth-screen'])
      })
    }
  }

  check(){
    const user = this.fireauth.checkAuth();

    if(user){
      alert(user.uid)
    }
  }

}
