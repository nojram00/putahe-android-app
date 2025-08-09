import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.scss'],
  standalone: false
})
export class RecipeInfoComponent  implements OnInit {

  @Input() recipe: IRecipe & {id: string} | null = null
  constructor() { }

  ngOnInit() {}

}
