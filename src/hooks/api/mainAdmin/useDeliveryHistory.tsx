import { useEffect, useState } from "react";
import useAxiosPrivate from "../../useAxiosPrivate";
import { DVDelivery } from "../../../utils/defaultValues";
import { IDelivery } from "../../../models/delivery.model";
import { DELIVERY_URL } from "../../../utils/endpoints";

const useDeliveryHistory = (id: string): [IDelivery[], any, boolean, Error] => {
  const [data, setData] = useState<IDelivery[]>([DVDelivery]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!data[0]._id) {
        try {
          const req = await axiosPrivate.get(
            DELIVERY_URL + "/" + id + "/deliveryman"
          );
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

export default useDeliveryHistory;
