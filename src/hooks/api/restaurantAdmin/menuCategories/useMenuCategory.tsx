import { useEffect, useState } from "react";
import { IMenuCategory } from "../../../../models/menuCategory.model";
import { DVCategory } from "../../../../utils/defaultValues";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { MENU_CATEGORY_URL } from "../../../../utils/endpoints";

const useMenuCategory = (): [IMenuCategory[], any, boolean, Error] => {
  const [data, setData] = useState<IMenuCategory[]>([DVCategory]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(MENU_CATEGORY_URL);
        setData(res.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, []);

  return [data, setData, isLoading, error];
};

export default useMenuCategory;
