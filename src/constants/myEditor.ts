export const errorDataInitialState = {
  title: {
    isValid: true,
    errorMessage: "Заглавието трябва да бъде минимум 5 символа",
  },
  author: {
    isValid: true,
    errorMessage: "Името на автора трябва да бъде минимум 5 символа",
  },
  date: {
    isValid: true,
    errorMessage: "Моля въведете дата",
  },
  url: {
    isValid: true,
    errorMessage: "Моля въведете правилен формат на URL",
  },
  content: {
    isValid: true,
    errorMessage: "Съдържанието трябва да бъде минимум 2 реда",
  },
};

export const inputInitialState = {
  title: "",
  author: "",
  date: "",
  imageURL: "",
  section: "wine-and-food",
};

export const ERROR_MESSAGE_TITLE = "Грешка";
export const GET_ALL_ARTICLES_ERROR_MESSAGE =
  "Възникна проблем при зареждане на всички статии.";
export const UPDATE_ARTICLE_ERROR_MESSAGE =
  "Възникна проблем при съсздаване на статията. Моля опитайте отново.";
export const EDITOR_VIDEO_TITLE = "YouTube video player";
export const EDITOR_VIDEO_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
