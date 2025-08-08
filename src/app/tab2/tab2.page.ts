import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  @ViewChild('modal') modal! : IonModal
  constructor() {}

  closeModal(){
    this.modal.dismiss(null, 'cancel');
  }

}
