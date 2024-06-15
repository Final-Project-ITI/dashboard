import { IAddress } from "./address.model";
import { IOrderStatus } from "./orderStatus.model";
import { IPhone } from "./phone.model";
import { IRestaurant } from "./restaurant.model";
import { IUser } from "./user.model";

export interface IOrder {
  _id: string;
  addressId: IAddress;
  phoneId: IPhone;
  statusId: IOrderStatus;
  restaurantId: IRestaurant;
  userId: IUser;
  createdAt: string;
}
