import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { register } from 'swiper/element/bundle';
import { FireauthService } from './services/fireauth.service';

register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router, private fireauth: FireauthService) {
    this.initializeOnboarding()
  }

  async initializeAuth(){
    console.log("Is Auth: ",this.fireauth.checkAuth() != null)
    console.log(this.fireauth.checkAuth())
    if(this.fireauth.checkAuth() != null){
      this.initializeOnboarding()
    }else{
      this.router.navigateByUrl('/auth-screen', { replaceUrl: true })
    }
  }

  initializeOnboarding(){
    Preferences.get({ key: 'doneOnboarding'}).then((value) => {
      if(value.value === 'true'){
        this.router.navigateByUrl('/', { replaceUrl: true })
      }else{
        this.router.navigateByUrl('/onboarding', { replaceUrl: true })
      }
    })
  }
}
