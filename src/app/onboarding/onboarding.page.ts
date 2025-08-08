import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Preferences } from '@capacitor/preferences'

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiper? : Swiper;

  constructor(private router: Router) { }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement;
  }

  next(){
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  ngOnInit() {
  }

  letsGo(){
    Preferences.set({ key: 'doneOnboarding', value: 'true' }).then(() => {
      this.router.navigate(['/'])
    })
  }

}
