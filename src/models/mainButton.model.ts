import { FC } from "react";

export interface IMainButton {
  text: string;
  Icon: FC<{ color: string }>;
  state: boolean;
  width?: any;
  handler?: Function;
}
