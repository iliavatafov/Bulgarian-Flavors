import * as Yup from "yup";
import {
  AUTHOR_MIN_LENGTH,
  AUTHOR_REQUIRED,
  CONTENT_MIN_LENGTH,
  DATE_REQUIRED,
  IMAGE_URL_INVALID,
  IMAGE_URL_REQUIRED,
  SECTION_REQUIRED,
  TITLE_MIN_LENGTH,
  TITLE_REQUIRED,
} from "../createArticle";

export const articleManagementValidationSchema = Yup.object({
  title: Yup.string().required(TITLE_REQUIRED).min(5, TITLE_MIN_LENGTH),
  author: Yup.string().required(AUTHOR_REQUIRED).min(5, AUTHOR_MIN_LENGTH),
  date: Yup.date().required(DATE_REQUIRED),
  imageURL: Yup.string().url(IMAGE_URL_INVALID).required(IMAGE_URL_REQUIRED),
  section: Yup.string().required(SECTION_REQUIRED),
  content: Yup.mixed().test(
    "is-content-empty",
    CONTENT_MIN_LENGTH,
    (_value, context: any) => {
      const editorState = context.options.context.content;
      if (!editorState) return false;
      const contentState = editorState.getCurrentContent();
      const plainText = contentState.getPlainText().trim();
      return plainText.length >= 30;
    }
  ),
});

export const CREATE_ARTICLE_FORM_SCHEMA = [
  {
    name: "title",
    type: "text",
    placeholder: "Въведи заглавие...",
    label: "Заглавие",
    class: "articleTitle",
  },
  {
    name: "author",
    type: "text",
    placeholder: "Въведи автор...",
    label: "Автор",
    class: "inner-form-container-wrapper",
  },
  {
    name: "date",
    type: "date",
    label: "Дата",
    class: "inner-form-container-wrapper",
  },
  {
    name: "imageURL",
    type: "text",
    placeholder: "Въведи URL...",
    label: "Основна снимка",
    class: "inner-form-container-wrapper",
  },
  {
    name: "section",
    type: "select",
    label: "Секция",
    options: [
      { value: "wine-and-food", label: "Вино и храна" },
      { value: "next-destination", label: "Следваща дестинация" },
      { value: "tourism-initiatives", label: "Инициативи за туризма" },
    ],
    class: "inner-form-container-wrapper",
  },
];
