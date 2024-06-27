import { useEffect, useState } from "react";
import { IUser } from "../../../models/user.model";
import useAxiosPrivate from "../../useAxiosPrivate";
import { DVUser } from "../../../utils/defaultValues";
import { RESTAURANTS_ADMINS_URL } from "../../../utils/endpoints";

const useRestaurantsAdmins = (): [IUser[], any, boolean, Error] => {
  const [data, setData] = useState<IUser[]>([DVUser]);
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!data[0]._id) {
        try {
          const req = await axiosPrivate.get(RESTAURANTS_ADMINS_URL);
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

export default useRestaurantsAdmins;
