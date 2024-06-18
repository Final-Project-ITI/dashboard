import { useState } from "react";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { MENU_CATEGORY_URL } from "../../../../utils/urls";

const useAddEditMenuCategory = ({
  setTrigger,
  menuCategory,
  isAdd,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputCategory) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("icon", data.icon[0]);

      if (isAdd) await axiosPrivate.post(MENU_CATEGORY_URL, formData);
      else {
        await axiosPrivate.patch(
          MENU_CATEGORY_URL + "/" + menuCategory?._id,
          formData
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

export default useAddEditMenuCategory;
