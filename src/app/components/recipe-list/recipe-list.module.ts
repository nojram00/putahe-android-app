import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeModalModule } from '../recipe-modal/recipe-modal.module';

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RecipeModalModule
  ],
  exports: [RecipeListComponent]
})
export class RecipeListModule { }
