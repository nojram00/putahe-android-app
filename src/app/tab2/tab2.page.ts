import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { FireauthService } from '../services/fireauth.service';
import { Router } from '@angular/router';
import { IRecipe } from '../interfaces/recipe';
import { RecipeModalComponent } from '../components/recipe-modal/recipe-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  @ViewChild('modal') modal! : IonModal

  myRecipes$ : IRecipe[] = []

  $user : any | null = null;

  constructor(private firestore: FirestoreService, private fireauth: FireauthService, private modalCtrl: ModalController) {}

  closeModal(){
    this.modal.dismiss(null, 'cancel');
  }

  ngOnInit(): void {
      this.initializeFetch()

      this.fireauth.mobileCheckAuth().then(res => {
        this.$user = res.user
      })
  }

  async initializeFetch(){
    await this.fireauth.waitForAuth();

    this.firestore.findByQuery('recipes', {
      property: 'user_id',
      operator: '==',
      value: this.$user.uid
    }).pipe().subscribe({
      next: (response) => {
        console.log("Response: ", response)
        this.myRecipes$ = response as IRecipe[]
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  viewInfo(recipe: IRecipe & { id: string }){
    this.modalCtrl.create({
      component: RecipeModalComponent,
      componentProps: {
        recipe: recipe
      }
    }).then(modal => {
      modal.present()
    })
  }

}
