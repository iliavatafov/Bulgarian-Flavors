export const cardSxStyles = {
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  borderRadius: "0",
  width: "100%",
};

export const titleSxStyles = {
  textAlign: "left",
  minHeight: 80,
  display: "flex",
  alignItems: "center",
};

export const subTitleSxStyles = {
  textAlign: "left",
  fontStyle: "italic",
  fontSize: "small",
  marginBottom: 1,
};

export const bodySxStyles = { textAlign: "left", marginBottom: "8px" };
