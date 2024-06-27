import { useState } from "react";
import useAxiosPrivate from "../../../useAxiosPrivate";
import { REGISTER_CASHIER_URL } from "../../../../utils/URLs";

const useAddCashier = ({ setTrigger, setData }: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputCashier) => {
    setIsLoading(true);

    try {
      await axiosPrivate.post(REGISTER_CASHIER_URL, data);

      setData((pre: any) => [
        { fullName: data.fullName, email: data.email },
        ...pre,
      ]);
      setTrigger(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return [onSubmit, isLoading, error];
};

export default useAddCashier;
