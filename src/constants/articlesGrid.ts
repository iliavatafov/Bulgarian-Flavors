export const APP_BAR_STYLES = {
  backgroundColor: "rgba(240, 242, 245, 0.8)",
  boxShadow: "none",
  paddingBottom: "1rem",
};

export const TOOLBAR_STYLES = {
  display: "flex",
  justifyContent: "center",
  padding: "0",
};

export const PAGE_SIZE = 10;

export const PAGE_TITLES = {
  wineAndFood: "Вино и храна",
  tourismInitiatives: "Инициативи за туризма",
  nextDestination: "Следваща дестицания",
  allArticles: "Новини",
};

export type SectionKey = keyof typeof PAGE_TITLES;

export const DESKTOP_ARTICLE_ASPECT = { xs: 12, md: 6, lg: 5.7, mid: false };

export const MOBILE_ARTICLE_ASPECT = { xs: 16, md: 6, lg: 8, mid: true };

export const EMPTY_STATE_TEXT = "Не са намерени статии с посоченото име.";

export const MOBILE_LOAD_POINT_OFFSET = 2000;
export const DESKTOP_LOAD_POINT_OFFSET = 1400;
export const MOBILE_BREAKPOINT = 801;

export const HOME_VIEW_TITLES = ["Новини", "Най-четени"];
