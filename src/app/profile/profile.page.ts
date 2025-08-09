import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user$ : User | null = null
  constructor(private router: Router, private fireauth: FireauthService) {}

  ngOnInit() {
    this.user$ = this.fireauth.checkAuth()

    console.log("User: ", this.user$);
  }

  logout(){
    this.fireauth.logout().then(() => {
      this.router.navigate(['/auth-screen'])
    })
  }

  check(){
    const user = this.fireauth.checkAuth();

    if(user){
      alert(user.uid)
    }
  }

}
