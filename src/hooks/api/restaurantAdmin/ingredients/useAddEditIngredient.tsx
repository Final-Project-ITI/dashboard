import { useState } from "react";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { INGREDIENT_URL } from "../../../../utils/urls";

const useAddEditIngredient = ({
  setTrigger,
  ingredient,
  isAdd,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputCashier) => {
    setIsLoading(true);

    try {
      let res: any;

      if (isAdd) res = await axiosPrivate.post(INGREDIENT_URL, data);
      else {
        res = await axiosPrivate.patch(
          INGREDIENT_URL + "/" + ingredient?._id,
          data
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

export default useAddEditIngredient;
