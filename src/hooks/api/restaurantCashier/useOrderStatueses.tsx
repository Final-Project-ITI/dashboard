import { useEffect, useState } from "react";
import { IOrderStatus } from "../../../models/orderStatus.model";
import { DVOrderStatus } from "../../../utils/defaultValues";
import useAxiosPrivate from "../../useAxiosPrivate";
import { GET_ORDER_STATUESES } from "../../../utils/endpoints";

const useOrderStatueses = (): [IOrderStatus[], boolean, Error] => {
  const [data, setData] = useState<IOrderStatus[]>([DVOrderStatus]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(GET_ORDER_STATUESES);
        setData(res.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, []);

  return [data, isLoading, error];
};

export default useOrderStatueses;
