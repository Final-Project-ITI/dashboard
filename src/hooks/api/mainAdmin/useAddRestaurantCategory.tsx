import { useState } from "react";
import useAxiosPrivate from "../../useAxiosPrivate";
import { RESTAURANT_CATEGORY_URL } from "../../../utils/urls";

const useAddRestaurantCategory = ({
  setTrigger,
  restaurantCategory,
  isAdd,
  setData,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputRestaurantCategory) => {
    setIsLoading(true);
    let res: any;

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("icon", data.icon[0]);

      if (isAdd) {
        res = await axiosPrivate.post(RESTAURANT_CATEGORY_URL, formData);

        setData((pre: any) => [...pre, res.data]);
      } else {
        res = await axiosPrivate.patch(
          RESTAURANT_CATEGORY_URL + "/" + restaurantCategory?._id,
          formData
        );

        setData((pre: any) =>
          pre.map((item: any) => {
            if (item._id === restaurantCategory._id) {
              item.title = data.title;
              item.description = data.description;
              if (res.data.icon) item.icon = res.data.icon;
            }

            return item;
          })
        );
      }
      setTrigger(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return [onSubmit, isLoading, error];
};

export default useAddRestaurantCategory;
