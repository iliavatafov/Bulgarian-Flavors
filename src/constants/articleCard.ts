export const CARD_SX_STYLES = {
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  borderRadius: "0",
  width: "100%",
};

export const TITLE_SX_STYLES = {
  textAlign: "left",
  minHeight: 80,
  display: "flex",
  alignItems: "center",
};

export const SUBTITLE_SX_STYLES = {
  textAlign: "left",
  fontStyle: "italic",
  fontSize: "small",
  marginBottom: 1,
};

export const BODY_SX_STYLES = { textAlign: "left", marginBottom: "8px" };
