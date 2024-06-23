import { useEffect, useState } from "react";

import useAxiosPrivate from "../../useAxiosPrivate";
import { DVRestaurantCategory } from "../../../utils/defaultValues";
import { RESTAURANT_CATEGORY_URL } from "../../../utils/urls";
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";

const useRestaurantsCategory = (): [IRestaurantCategory[], boolean, Error] => {
  const [data, setData] = useState<IRestaurantCategory[]>([
    DVRestaurantCategory,
  ]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!data[0]._id) {
        try {
          const req = await axiosPrivate.get(RESTAURANT_CATEGORY_URL);
          setData(await req.data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.response);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  return [data, isLoading, error];
};

export default useRestaurantsCategory;
