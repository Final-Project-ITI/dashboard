import { useState } from "react";
import { IFormInputRestaurant } from "../../models/formInputs/formInputRestaurant.model";
import { CREATE_RESTAURANT_URL } from "../../utils/urls";
import useAxiosPrivate from "../useAxiosPrivate";

const useAddRestaurant = ({ setTrigger }: any): [any, boolean, Error] => {
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

      await axiosPrivate.post(CREATE_RESTAURANT_URL, formData);
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
