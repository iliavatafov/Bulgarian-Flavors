import * as Yup from "yup";
import {
  INVALID_EMAIL_TEXT,
  PASSWORDS_DONT_MATCH_MESSAGE,
  REQUIRED_FIELD_TEXT,
} from "../../constants/auth";
import { checkPasswordsForEquality } from "../../utils/authUtils";

export const updateProfileFormSchema = [
  {
    label: "E-mail",
    name: "email",
    type: "email",
    placeholder: "E-mail",
  },
  {
    label: "Нова парола",
    name: "password",
    type: "password",
    placeholder: "Нова парола",
    showPassword: true,
  },
  {
    label: "Повторете новата парола",
    name: "confirmPassword",
    type: "password",
    placeholder: "Повторете новата парола",
    showPassword: true,
  },
];

export const loginFormSchema = [
  {
    label: "E-mail",
    name: "email",
    type: "email",
    placeholder: "E-mail",
  },
  {
    label: "Парола",
    name: "password",
    type: "password",
    placeholder: "Парола",
    showPassword: true,
  },
];

export const registerFormSchema = [
  {
    label: "E-mail",
    name: "email",
    type: "email",
    placeholder: "E-mail",
  },
  {
    label: "Парола",
    name: "password",
    type: "password",
    placeholder: "Парола",
    showPassword: true,
  },
  {
    label: "Повторете паролата",
    name: "confirmPassword",
    type: "password",
    placeholder: "Повторете паролата",
    showPassword: true,
  },
];

export const updateProfileValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
  password: Yup.string(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], PASSWORDS_DONT_MATCH_MESSAGE)
    .test(
      "passwords-match",
      PASSWORDS_DONT_MATCH_MESSAGE,
      checkPasswordsForEquality
    ),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
  password: Yup.string().required(REQUIRED_FIELD_TEXT),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
  password: Yup.string().required(REQUIRED_FIELD_TEXT),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], PASSWORDS_DONT_MATCH_MESSAGE)
    .required(REQUIRED_FIELD_TEXT),
});
