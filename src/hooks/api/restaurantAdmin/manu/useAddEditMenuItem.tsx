import { useState } from "react";
import { IFormInputMenuItem } from "../../../../models/formInputs/formInputMenuItem.model";
import { IIngredient } from "../../../../models/ingredient.model";
import { CREATE_PRODUCT_URL } from "../../../../utils/urls";
import useAxiosPrivate from "../../../useAxiosPrivate";

const useAddEditMenuItem = ({
  setTrigger,
  menuItem,
  isAdd,
  tags,
  setTags,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputMenuItem) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      if (data.icon[0]) formData.append("icon", data.icon[0]);
      formData.append("menuCategoryId", data.category);
      tags.forEach((element: IIngredient) => {
        formData.append("ingredientsIds", element._id);
      });

      let res: any;

      if (isAdd) res = await axiosPrivate.post(CREATE_PRODUCT_URL, formData);
      else {
        res = await axiosPrivate.patch(
          CREATE_PRODUCT_URL + "/" + menuItem?._id,
          formData
        );
      }

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

export default useAddEditMenuItem;
