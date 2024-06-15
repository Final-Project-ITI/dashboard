import { IMenuCategory } from "../../../models/menuCategory.model";

export interface FormInputProps {
  name: string;
  control: any;
  label?: string;
  type?: string;
  setValue?: any;
  categories?: IMenuCategory[];
}
