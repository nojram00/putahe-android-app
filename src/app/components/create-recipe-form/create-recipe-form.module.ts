import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeFormComponent } from './create-recipe-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateRecipeFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [CreateRecipeFormComponent]
})
export class CreateRecipeFormModule { }
