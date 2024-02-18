import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const EmptyState = ({ text }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={5}
    >
      <SentimentVeryDissatisfied fontSize="large" color="action" />
      <Typography variant="h6" color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

export default EmptyState;
