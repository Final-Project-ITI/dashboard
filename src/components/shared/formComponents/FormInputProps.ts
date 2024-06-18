import { IMenuCategory } from "../../../models/menuCategory.model";

export interface FormInputProps {
  name: string;
  control: any;
  label?: string;
  type?: string;
  setValue?: any;
  register?: any;
  validation?: any;
  categories?: IMenuCategory[];
}
