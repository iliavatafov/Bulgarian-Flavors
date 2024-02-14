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
