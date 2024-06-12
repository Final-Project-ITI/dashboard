import { IRestaurant } from "./restaurant.model";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  icon: string;
  restaurantId: IRestaurant;
}
