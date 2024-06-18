import { useEffect, useState } from "react";
import { IItem } from "../../../models/item.model";
import { IOrder } from "../../../models/order.model";
import { DVItem, DVOrder } from "../../../utils/defaultValues";
import { GET_ORDERS_URL } from "../../../utils/urls";
import useAxiosPrivate from "../../useAxiosPrivate";

const useOrders = (): [
  { orders: IOrder[]; items: IItem[] },
  any,
  boolean,
  any,
  Error,
  any
] => {
  const [data, setData] = useState<{ orders: IOrder[]; items: IItem[] }>({
    orders: [DVOrder],
    items: [DVItem],
  });
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosPrivate.get(GET_ORDERS_URL);
        setData(res.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
      }
    })();
  }, []);

  return [data, setData, isLoading, setIsLoading, error, setError];
};

export default useOrders;
