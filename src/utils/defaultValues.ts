import { IItem } from "./../models/item.model";
export const DVLogin = {
  email: "",
  password: "",
};

export const DVAddRestaurant = {
  name: "",
  description: "",
  address: "",
  phone: "",
};

export const DVAddCashier = {
  fullName: "",
  email: "",
  password: "",
};

export const DVCategory = {
  _id: "",
  name: "",
  icon: "",
  restaurantId: "",
};

export const DVIngredient = {
  _id: "",
  name: "",
  restaurantId: "",
};

export const DVMenuItem = {
  title: "",
  price: "",
  description: "",
  category: "",
};

export const DVRestaurant = {
  _id: "",
  name: "",
  icon: "",
  banner: "",
  description: "",
  address: "",
  phone: "",
};
export const DVRestaurantCategory = {
  _id: "",
  name: "",
  icon: "",
  description: "",
};

export const DVUser = {
  _id: "",
  fullName: "",
  email: "",
  image: "",
  restaurantId: DVRestaurant,
};

export const DVProduct = {
  _id: "",
  title: "",
  price: 0,
  description: "",
  icon: "",
  restaurantId: "",
  menuCategoryId: "",
  ingredientsIds: [DVIngredient],
};

export const DVAddrees = {
  _id: "",
  userId: DVUser,
  details: "",
};

export const DVPhone = {
  _id: "",
  userId: DVUser,
  phoneNumber: "",
};

export const DVOrderStatus = {
  _id: "",
  status: "",
};

export const DVOrder = {
  _id: "",
  addressId: DVAddrees,
  phoneId: DVPhone,
  statusId: DVOrderStatus,
  restaurantId: DVRestaurant,
  userId: DVUser,
  createdAt: "",
};

export const DVItem = {
  _id: "",
  productId: DVProduct,
  quantity: 0,
  orderId: "",
};

export const DVDeliveryman = {
  _id: "",
  userId: DVUser,
  currentlyDeliver: [
    {
      _id: "",
      orderId: "",
      deliveryManId: "",
      assignedAt: null,
      deliverdAt: null,
    },
  ],
  status: "offline",
};

export const DVDelivery = {
  _id: "",
  orderId: DVOrder,
  deliveryManId: {
    _id: "",
    userId: "",
    currentlyDeliver: "",
    status: "offline",
  },
  assignedAt: null,
  deliverdAt: null,
  restaurant: DVRestaurant,
  items: [DVItem],
  total: 0,
};

export const DVAddDelivery = {
  email: "",
  phone: "",
};
