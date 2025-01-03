import { FC } from "react";
import { InputProps } from "../../types/inputTypes";

import "./styles.css";

export const Input: FC<InputProps> = ({
  type,
  id,
  label,
  reference,
  require,
  defaultVal,
  disable,
  placeHolder,
  name,
  icon,
  classes,
  changeHandler = () => {},
  value,
}) => {
  return (
    <div className={classes}>
      {icon && icon}
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={id}
        ref={reference}
        required={require}
        defaultValue={defaultVal}
        disabled={disable}
        placeholder={placeHolder}
        name={name}
        onChange={changeHandler}
        value={value}
      />
    </div>
  );
};
