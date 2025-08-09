import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
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
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async submit(form: NgForm) {
    await this.fireauth.waitForAuth();
    if (form.valid) {
      console.log(form.value);

      const data = {
        user_id : this.fireauth.checkAuth()?.uid,
        user_info: {
          email: this.fireauth.checkAuth()?.email,
          name: this.fireauth.checkAuth()?.displayName
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
