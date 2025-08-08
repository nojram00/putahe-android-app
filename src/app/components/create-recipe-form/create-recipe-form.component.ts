import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRecipe } from 'src/app/interfaces/recipe';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create-recipe-form',
  templateUrl: './create-recipe-form.component.html',
  styleUrls: ['./create-recipe-form.component.scss'],
  standalone: false
})
export class CreateRecipeFormComponent  implements OnInit {

  @ViewChild('recipeForm') recipeForm: any

  name: string = ''
  ingredients: string = ''
  steps: string = ''

  recipe : IRecipe = {
    name : '',
    ingredients : '',
    steps : ''
  }

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {}

  submit(form: NgForm){
    if(form.valid){
      console.log(form.value)

      this.firestoreService.create(form.value, 'recipes')
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
    }
  }

}
