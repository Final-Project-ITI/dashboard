import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { IUser } from "../../models/user.model";
import useAxiosPrivate from "../useAxiosPrivate";
import { USER_URL } from "../../utils/urls";

const useUser = (): [IUser, any, boolean, Error] => {
  const { user, setUser } = useContext(UserContext);

  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axiosPrivate.get(USER_URL);
        setUser(data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response);
        setIsLoading(false);
      }
    })();
  }, []);

  return [user, setUser, isLoading, error];
};

export default useUser;
