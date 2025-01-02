import { ChangeEvent } from "react";

import { ErrorMessage, Field } from "formik";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../Auth.module.css";

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  showPassword,
  handleShowPassword,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  handleShowPassword?: () => void;
}) => (
  <div className={styles["form-group"]}>
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles.input}
      onChange={onChange}
    />
    {name === "password" && (
      <FontAwesomeIcon
        onClick={handleShowPassword}
        className={showPassword ? styles.eyeclicked : styles.eye}
        icon={faEye}
      />
    )}
    <ErrorMessage name={name} component="div" className={styles.errorMessage} />
  </div>
);
