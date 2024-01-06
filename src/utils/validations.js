export const isValidURL = (url) => {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  return pattern.test(url);
};

export const validateStrMinLength = (string, number) => {
  return string.length >= number;
};
