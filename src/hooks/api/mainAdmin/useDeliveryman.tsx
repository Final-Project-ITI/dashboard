import { useEffect, useState } from "react";
import useAxiosPrivate from "../../useAxiosPrivate";
import { DVDeliveryman } from "../../../utils/defaultValues";
import { IDeliveryman } from "../../../models/deliveryman.model";
import { DELIVERY_MAN_URL } from "../../../utils/endpoints";

const useDeliveryman = (): [IDeliveryman[], any, boolean, Error] => {
  const [data, setData] = useState<IDeliveryman[]>([DVDeliveryman]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!data[0]._id) {
        try {
          const req = await axiosPrivate.get(DELIVERY_MAN_URL);
          setData(await req.data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.response);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  return [data, setData, isLoading, error];
};

export default useDeliveryman;
