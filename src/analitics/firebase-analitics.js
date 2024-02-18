import { firebaseAnalytics } from "../firebase";

const logCustomEvent = (eventName, eventParams) => {
  firebaseAnalytics.logEvent(eventName, eventParams);
};

export const trackArticleView = (articleId) => {
  logCustomEvent("article_view", { article_id: articleId });
};
