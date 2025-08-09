import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeModalComponent } from './recipe-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [RecipeModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RecipeModalComponent]
})
export class RecipeModalModule { }
