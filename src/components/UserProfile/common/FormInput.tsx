import { FC } from "react";

import { ErrorMessage, Field } from "formik";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { FormInputProps } from "../../../types/authTypes";

import styles from "../Auth.module.css";

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  disabled = false,
  showPassword,
  handleShowPassword,
}) => (
  <div className={styles["form"]}>
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      className={styles.input}
      onChange={onChange}
    />
    {showPassword !== undefined && handleShowPassword && (
      <FontAwesomeIcon
        onClick={handleShowPassword}
        className={showPassword ? styles.eyeclicked : styles.eye}
        icon={faEye}
      />
    )}
    <ErrorMessage name={name} component="div" className={styles.errorMessage} />
  </div>
);
