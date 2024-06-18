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
