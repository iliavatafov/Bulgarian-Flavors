export const isValidURL = (url: string) => {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  return pattern.test(url);
};

export const validateStrMinLength = (
  string: string,
  number: number
): boolean => {
  return string.length >= number;
};
