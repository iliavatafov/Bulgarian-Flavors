import { ChangeEventHandler, JSX, RefObject } from "react";

export interface InputProps {
  type: string;
  id: string;
  label: string;
  reference?: RefObject<HTMLInputElement>;
  require?: boolean;
  defaultVal?: string;
  disable?: boolean;
  placeHolder?: string;
  name?: string;
  icon?: JSX.Element;
  classes?: string;
  changeHandler?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}
