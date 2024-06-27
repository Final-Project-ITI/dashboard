import { useEffect, useState } from "react";
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";
import useAxiosPrivate from "../../useAxiosPrivate";
import { RESTAURANT_CATEGORY_URL } from "../../../utils/URLs";
import { DVRestaurantCategory } from "../../../utils/defaultValues";

const useItemRestaurantCategories = ({
  restaurant,
}: any): [IRestaurantCategory[], any, boolean, Error] => {
  const [data, setData] = useState<IRestaurantCategory[]>([
    DVRestaurantCategory,
  ]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(RESTAURANT_CATEGORY_URL);

        const categoriesIds = restaurant?.categoriesIds.map(
          (resCat: IRestaurantCategory) => resCat._id
        );

        setData(
          res.data.filter(
            (resCat: IRestaurantCategory) =>
              !categoriesIds?.includes(resCat._id)
          )
        );
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, [restaurant]);

  return [data, setData, isLoading, error];
};

export default useItemRestaurantCategories;
