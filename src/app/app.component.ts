import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { register } from 'swiper/element/bundle';

register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {
    Preferences.get({ key: 'doneOnboarding'}).then((value) => {
      if(value.value === 'true'){
        router.navigate(['/'])
      }else{
        router.navigate(['/onboarding'])
      }
    })
  }
}
