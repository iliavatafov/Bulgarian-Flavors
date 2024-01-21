import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Tooltip } from "@mui/material";

export const ArticleCard = ({ item }) => {
  const text = item.constent.blocks[0].text.slice(0, 200);

  const handleShareFacebook = () => {
    console.log("facebook share");
  };

  const handleShareTwitter = () => {
    console.log("twiter share");
  };

  const handleSharePinterest = () => {
    console.log("pinterest share");
  };

  const handleCopyLink = () => {
    console.log("copy url");
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
      }}
    >
      <CardMedia sx={{ height: 250 }} image={item.URL} title={item.title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: "left",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="author"
          component="div"
          sx={{
            textAlign: "left",
            fontStyle: "italic",
            fontSize: "small",
            marginBottom: 1,
          }}
        >
          Автор: {item.author}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          {text + " ..."}
        </Typography>
        <div style={{ marginTop: "8px", textAlign: "right" }}>
          <Tooltip title="Сподели в Facebook">
            <IconButton onClick={handleShareFacebook}>
              <FacebookIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Сподели в Twitter">
            <IconButton onClick={handleShareTwitter}>
              <TwitterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Сподели в Pinterest">
            <IconButton onClick={handleSharePinterest}>
              <PinterestIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Копирай линк">
            <IconButton onClick={handleCopyLink}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
