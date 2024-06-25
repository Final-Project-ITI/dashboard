import { IPhone } from "./phone.model";
import { IUser } from "./user.model";

export interface IDeliveryman {
    _id: string;
    userId:IUser;
    currentlyDeliver:[{
        _id: string;
        orderId:String;
        deliveryManId: String;
        assignedAt: Date | null
        deliverdAt: Date | null;    
    }];
    status:string;
    phoneId:IPhone;
}