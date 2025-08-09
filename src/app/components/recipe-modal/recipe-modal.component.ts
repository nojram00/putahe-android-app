import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IRecipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
  standalone: false
})
export class RecipeModalComponent  implements OnInit {

  @Input() recipe: IRecipe & {id: string} | null = null
  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss(null, 'cancel')
  }

  parseIngredients(){
    let ingredients: string[] = [];
    if(this.recipe){
      ingredients = (this.recipe.ingredients as string).split(',').map((s, idx) => {
        return `${idx + 1}. ${s}`
      });
    }

    return ingredients;
  }

  parseSteps(){
    let steps: string[] = [];
    if(this.recipe){
      steps = (this.recipe.steps as string)
              .split(/\d+\.\s*/g)
              .filter(step => step.trim() !== '')
              .map((step, idx) => `${idx + 1}. ${step.trim()}`)
    }

    return steps;
  }

}
