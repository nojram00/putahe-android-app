import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: false
})
export class InfoPage implements OnInit {

  recipeId$ : string = '';
  recipeInfo : any = null;
  constructor(private route: ActivatedRoute, private firestore: FirestoreService) { }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.recipeId$ = params.get('id') as string;
        this.firestore.find('recipes', this.recipeId$).pipe().subscribe({
          next: (recipe) => {
            this.recipeInfo = recipe
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }

  parseIngredients(){
    let ingredients: string[] = [];
    if(this.recipeInfo){
      ingredients = (this.recipeInfo.ingredients as string).split(',').map((s, idx) => {
        return `${idx + 1}. ${s}`
      });
    }

    return ingredients;
  }

  parseSteps(){
    let steps: string[] = [];
    if(this.recipeInfo){
      steps = (this.recipeInfo.steps as string)
              .split(/\d+\.\s*/g)
              .filter(step => step.trim() !== '')
              .map((step, idx) => `${idx + 1}. ${step.trim()}`)
    }

    return steps;
  }

}
