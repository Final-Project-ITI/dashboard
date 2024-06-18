import { useEffect, useState } from "react";
import { IUser } from "../../../../models/user.model";
import { DVUser } from "../../../../utils/defaultValues";
import { RESTAURANTS_CAHSIERS_URL } from "../../../../utils/urls";
import useAxiosPrivate from "../../../useAxiosPrivate";

const useCashiers = (): [IUser[], boolean, Error] => {
  const [data, setData] = useState<IUser[]>([DVUser]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!data[0]._id) {
        try {
          const res = await axiosPrivate.get(RESTAURANTS_CAHSIERS_URL);
          setData(await res.data);
          setIsLoading(false);
        } catch (err: any) {
          setError(err.response);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  return [data, isLoading, error];
};

export default useCashiers;
