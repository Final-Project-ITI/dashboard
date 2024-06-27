import { useEffect } from "react";
import { GET_ORDERS_URL } from "../../../utils/URLs";
import useAxiosPrivate from "../../useAxiosPrivate";

const useFilteredOrders = ({
  startDate,
  endDate,
  setData,
  setIsLoading,
  setError,
}: any): void => {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async function () {
      if (startDate && endDate) {
        try {
          setIsLoading(true);

          const res = await axiosPrivate.get(
            GET_ORDERS_URL +
              "/filter?startDate=" +
              startDate +
              "&endDate=" +
              endDate
          );
          setData(res.data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.response);
        }
      }
    })();
  }, [startDate, endDate]);
};

export default useFilteredOrders;
