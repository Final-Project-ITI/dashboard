import { useState } from "react";
import useAxiosPrivate from "../../useAxiosPrivate";
import { IFormInputRestaurant } from "../../../models/formInputs/formInputRestaurant.model";
import { CREATE_RESTAURANT_URL } from "../../../utils/urls";
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";

const useAddRestaurant = ({
  setTrigger,
  setData,
  reset,
  tags,
  setTags,
  setRestaurantCategories,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputRestaurant) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("icon", data.icon[0]);
      formData.append("banner", data.banner[0]);
      tags.forEach((element: IRestaurantCategory) => {
        formData.append("categoriesIds", element._id);
      });

      const res = await axiosPrivate.post(CREATE_RESTAURANT_URL, formData);

      console.log(res.data);
      setData((pre: any) => [
        { restaurantId: res.data, email: data.email },
        ...pre,
      ]);

      reset();
      setRestaurantCategories((pre: any) => [...pre, ...tags]);
      setTags([]);
      setTrigger(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return [onSubmit, isLoading, error];
};

export default useAddRestaurant;
