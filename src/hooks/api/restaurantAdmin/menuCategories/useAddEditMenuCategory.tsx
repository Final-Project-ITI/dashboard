import { useState } from "react";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { MENU_CATEGORY_URL } from "../../../../utils/endpoints";

const useAddEditMenuCategory = ({
  setTrigger,
  menuCategory,
  isAdd,
  setData,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputCategory) => {
    setIsLoading(true);
    let res: any;

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("icon", data.icon[0]);

      if (isAdd) {
        res = await axiosPrivate.post(MENU_CATEGORY_URL, formData);

        setData((pre: any) => [...pre, res.data]);
      } else {
        res = await axiosPrivate.patch(
          MENU_CATEGORY_URL + "/" + menuCategory?._id,
          formData
        );

        setData((pre: any) =>
          pre.map((item: any) => {
            if (item._id === menuCategory._id) {
              item.name = data.name;
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

export default useAddEditMenuCategory;
