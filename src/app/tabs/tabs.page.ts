import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  constructor(private router: Router, private fireauth: FireauthService) {}

  ngOnInit(): void {
    console.log("User: ", this.fireauth.checkAuth());
  }

}
