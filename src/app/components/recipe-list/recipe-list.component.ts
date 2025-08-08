import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces/recipe';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false
})
export class RecipeListComponent  implements OnInit {

  recipeList: Array<IRecipe & { id: string }> = []
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.fetchRecipes()
  }

  fetchRecipes() {
    this.firestoreService.show('recipes').pipe().subscribe({
      next: (recipes) => {
        console.log(recipes)
        this.recipeList = recipes as Array<IRecipe & {id: string}>
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
