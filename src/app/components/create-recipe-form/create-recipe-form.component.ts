import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { IRecipeInput } from 'src/app/interfaces/recipe';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create-recipe-form',
  templateUrl: './create-recipe-form.component.html',
  styleUrls: ['./create-recipe-form.component.scss'],
  standalone: false,
})
export class CreateRecipeFormComponent implements OnInit {
  @ViewChild('recipeForm') recipeForm: any;

  user$ : any | null = null;

  name: string = '';
  ingredients: string = '';
  steps: string = '';

  recipe: IRecipeInput = {
    name: '',
    ingredients: '',
    steps: '',
  };

  constructor(
    private firestoreService: FirestoreService,
    private fireauth: FireauthService,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {}

  ngOnInit() {
    if(this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')){
      this.fireauth.mobileCheckAuth().then((res) => {
        this.user$ = res.user
      })
    }else{
      this.user$ = this.fireauth.checkAuth();
    }
  }

  async submit(form: NgForm) {
    await this.fireauth.waitForAuth();
    if (form.valid) {
      console.log(form.value);

      const data = {
        user_id : this.user$.uid,
        user_info: {
          email: this.user$.email,
          name: this.user$.displayName
        },
        ...form.value,
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
      }

      this.firestoreService
        .create(data, 'recipes')
        .then((response) => {
          console.log(response);

          this.toastCtrl.create({
            message: 'Recipe Added!',
            duration: 3000,
            position: 'top'
          }).then(toast => {
            toast.present()
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
