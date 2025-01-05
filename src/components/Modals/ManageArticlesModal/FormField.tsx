import { FC } from "react";
import { Field, ErrorMessage } from "formik";

import type { FormFieldProps } from "../../../types/articlesTypes";

import styles from "./styles.module.css";

export const FormField: FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
  label,
  className,
  options,
}) => {
  return (
    <>
      {type === "select" ? (
        <Field as="select" name={name} className={className}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
        />
      )}
      <label htmlFor={name}>{label}</label>
      <ErrorMessage
        name={name}
        component="p"
        className={styles["error-message"]}
      />
    </>
  );
};
