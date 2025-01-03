export const truncateTitle = (title: string, isMobile: boolean): string => {
  const maxLength = isMobile ? 38 : 60;
  return title.length > maxLength ? title.slice(0, maxLength) + " ..." : title;
};
