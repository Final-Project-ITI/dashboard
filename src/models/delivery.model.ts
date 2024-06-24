import { IItem } from "./item.model";
import { IOrder } from "./order.model"
import { IRestaurant } from "./restaurant.model";
export interface IDelivery {
    _id: string;
    orderId: IOrder;
    deliveryManId:  {
        _id: string,
        userId:string,
        currentlyDeliver: string,
        status: string,
      };
    assignedAt: Date|null;
    deliverdAt: Date|null; 
    restaurant:IRestaurant;
    items:IItem[];
    total:number 
}