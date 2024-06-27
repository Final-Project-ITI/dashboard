import { useState } from "react";
import useAxiosPrivate from "../../useAxiosPrivate";
import { IFormInputDeliveryMan } from "../../../models/formInputs/formInputDeliveryMan.model.ts";
import { DELIVERY_MAN_URL } from "../../../utils/endpoints.ts";

const useAddDeliveryMan = ({
  setTrigger,
  setData,
  reset,
}: any): [any, boolean, Error] => {
  const axiosPrivate = useAxiosPrivate();

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IFormInputDeliveryMan) => {
    setIsLoading(true);

    try {
      const res = await axiosPrivate.post(DELIVERY_MAN_URL, data);

      setData((pre: any) => [...pre, res.data]);

      reset();
      setTrigger(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return [onSubmit, isLoading, error];
};

export default useAddDeliveryMan;
