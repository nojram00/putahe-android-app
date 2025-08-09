export interface IRecipe {
  id: string;
  name: string;
  ingredients: string;
  steps: string;
  user_id: string;
  user_info: {
    email: string;
    name: string;
  }
}

export interface IRecipeInput {
  name: string;
  ingredients: string;
  steps: string;
}