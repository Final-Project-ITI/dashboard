import { useEffect, useState } from "react";
import { IIngredient } from "../../../../models/ingredient.model";
import { DVIngredient } from "../../../../utils/defaultValues";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { INGREDIENT_URL } from "../../../../utils/endpoints";

const useIngredients = (): [IIngredient[], any, boolean, Error] => {
  const [data, setData] = useState<IIngredient[]>([DVIngredient]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(INGREDIENT_URL);
        setData(res.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, []);

  return [data, setData, isLoading, error];
};

export default useIngredients;
