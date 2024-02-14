import { useState, useCallback } from "react";

import { validateStrMinLength, isValidURL } from "../utils/validations";
import { errorDataInitialState } from "../constants/myEditor";

const useInputValidation = () => {
  const [errorData, setErrorData] = useState(errorDataInitialState);

  const validateInput = useCallback(
    (title, author, URL, rawContentState, date) => {
      const fieldsToValidate = {
        title: {
          value: title,
          validator: (value) => validateStrMinLength(value, 5),
          errorMessage: "Заглавието трябва да бъде минимум 5 символа",
        },
        author: {
          value: author,
          validator: (value) => validateStrMinLength(value, 5),
          errorMessage: "Името на автора трябва да бъде минимум 5 символа",
        },
        date: {
          value: date,
          validator: (value) => validateStrMinLength(value, 1),
          errorMessage: "Моля въведете дата",
        },
        url: {
          value: URL,
          validator: isValidURL,
          errorMessage: "Моля въведете правилен формат на URL",
        },
        content: {
          value: rawContentState.blocks,
          validator: (value) => value.length > 1,
          errorMessage: "Съдържанието трябва да бъде минимум 2 реда",
        },
      };

      const updatedErrorData = {};

      for (const fieldKey in fieldsToValidate) {
        if (Object.prototype.hasOwnProperty.call(fieldsToValidate, fieldKey)) {
          const field = fieldsToValidate[fieldKey];
          const isValid = field.validator(field.value);
          updatedErrorData[fieldKey] = {
            isValid,
            errorMessage: isValid ? "" : field.errorMessage,
          };
        }
      }

      setErrorData(updatedErrorData);
      return Object.values(updatedErrorData).some((error) => {
        return error.isValid === false;
      });
    },
    []
  );

  return { errorData, validateInput };
};

export default useInputValidation;
