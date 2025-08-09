import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IRecipe } from 'src/app/interfaces/recipe';
import { FirestoreService } from 'src/app/services/firestore.service';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false
})
export class RecipeListComponent  implements OnInit {

  recipeList: Array<IRecipe & { id: string }> = []
  constructor(private firestoreService: FirestoreService, private router: Router, private modalctrl : ModalController) { }

  ngOnInit() {
    this.fetchRecipes()
  }

  fetchRecipes() {
    this.firestoreService.show('recipes').pipe().subscribe({
      next: (recipes) => {
        this.recipeList = recipes as Array<IRecipe & {id: string}>
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  navigateToInfo(id : string){
    this.router.navigate(['/tabs/info/', id])
  }

  viewInfo(recipe : IRecipe & {id: string}){
    console.log(recipe);
    this.modalctrl.create({
      component: RecipeModalComponent,
      componentProps: {
        recipe: recipe
      }
    }).then(modal => {
      modal.present()
    })
  }

}
