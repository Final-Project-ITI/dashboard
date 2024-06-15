import { IIngredient } from "./ingredient.model";

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  icon: string;
  restaurantId: string;
  menuCategoryId: string;
  ingredientsIds: IIngredient[];
}
