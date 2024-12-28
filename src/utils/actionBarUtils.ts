export const handleShare = (
  event: React.MouseEvent,
  platform: string,
  urlToShare: string,
  text?: string
) => {
  event.stopPropagation();

  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        text: text || "",
        url: urlToShare,
      })
      .then(() => console.log(`Shared to ${platform}`))
      .catch((error) => console.error(`Error sharing to ${platform}:`, error));
  } else {
    alert(`Sharing to ${platform} is not supported in this browser.`);
  }
};
