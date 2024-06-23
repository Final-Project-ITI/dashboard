import { useEffect, useState } from "react";
import { IProduct } from "../../../../models/product.model";
import { DVProduct } from "../../../../utils/defaultValues";
import { PRODUCT_URL } from "../../../../utils/urls";
import useAxiosPrivate from "../../../useAxiosPrivate";

const useMenu = ({ user }: any): [IProduct[], any, boolean, Error] => {
  const [data, setData] = useState<IProduct[]>([DVProduct]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (user._id) {
        try {
          const res = await axiosPrivate.get(
            PRODUCT_URL + "/" + user.restaurantId?._id
          );
          setData(res.data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.response);
        }
      }
    })();
  }, [user]);

  return [data, setData, isLoading, error];
};

export default useMenu;
