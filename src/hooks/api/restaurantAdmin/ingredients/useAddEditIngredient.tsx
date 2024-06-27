import { useState } from "react";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { INGREDIENT_URL } from "../../../../utils/URLs";
import { IFormInputIngredient } from "../../../../models/formInputs/formInputIngredient.model";

const useAddEditIngredient = ({
  setTrigger,
  ingredient,
  isAdd,
  reset,
  setData,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputIngredient) => {
    setIsLoading(true);

    try {
      let res: any;

      if (isAdd) {
        res = await axiosPrivate.post(INGREDIENT_URL, data);

        setData((pre: any) => [...pre, res.data]);
      } else {
        res = await axiosPrivate.patch(
          INGREDIENT_URL + "/" + ingredient?._id,
          data
        );

        setData((pre: any) =>
          pre.map((item: any) => {
            if (item._id === ingredient._id) {
              item.name = data.name;
            }

            return item;
          })
        );
      }

      reset();
      setTrigger(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data);
      reset();
      setIsLoading(false);
      setTrigger(false);
    }
  };

  return [onSubmit, isLoading, error];
};

export default useAddEditIngredient;
