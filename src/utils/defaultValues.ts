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
  email: null,
  password: "",
};

export const DVCategory = {
  name: "",
};

export const DVIngredient = {
  name: "",
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
