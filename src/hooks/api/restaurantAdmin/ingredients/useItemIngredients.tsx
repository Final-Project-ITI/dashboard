import { useEffect, useState } from "react";
import { IIngredient } from "../../../../models/ingredient.model";
import { DVCategory } from "../../../../utils/defaultValues";
import { INGREDIENT_URL } from "../../../../utils/URLs";
import useAxiosPrivate from "../../../useAxiosPrivate";

const useItemIngredients = ({
  menuItem,
}: any): [IIngredient[], any, boolean, Error] => {
  const [data, setData] = useState<IIngredient[]>([DVCategory]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(INGREDIENT_URL);

        const ingredientsIds = menuItem?.ingredientsIds.map(
          (ingredient: IIngredient) => ingredient._id
        );

        setData(
          res.data.filter(
            (ingredient: IIngredient) =>
              !ingredientsIds?.includes(ingredient._id)
          )
        );
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, [menuItem]);

  return [data, setData, isLoading, error];
};

export default useItemIngredients;
