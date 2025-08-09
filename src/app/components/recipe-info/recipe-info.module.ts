import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeInfoComponent } from './recipe-info.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [RecipeInfoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RecipeInfoComponent]
})
export class RecipeInfoModule { }
