import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CARD_SX_STYLES, CARD_THEME } from "../../../constants/articleCard.ts";
import type { ArticleCardProps } from "../../../types/articlesTypes.ts";

import { ActionBar } from "../../ActionBar/index.tsx";
import { CardTitle } from "./CardTitle.tsx";
import { CardAuthor } from "./CardAuthor.tsx";
import { CardBody } from "./CardBody.tsx";

export const ArticleCard: FC<ArticleCardProps> = ({ item }) => {
  const { section, id, URL, title, author, constent } = item;
  const text = get(constent, "blocks[0].text", "").slice(0, 200);
  const articlePath = `/${section}/${id}`;

  const navigate = useNavigate();

  const navigateToDetailsPage = useCallback(() => {
    navigate(articlePath);
  }, [navigate, articlePath]);

  const memoizedTheme = useMemo(() => createTheme(CARD_THEME), []);

  return (
    <ThemeProvider theme={memoizedTheme}>
      <Card onClick={navigateToDetailsPage} sx={CARD_SX_STYLES}>
        <CardMedia sx={{ height: 250 }} image={URL} title={title} />
        <CardContent>
          <CardTitle title={title} />
          <CardAuthor author={author} />
          <CardBody text={text} />
          <ActionBar articleUrl={window.location.href + `${section}/${id}`} />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
