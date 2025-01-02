export const getHeaderStyles = (
  isHomeView: boolean,
  isLargeScreen: boolean
) => ({
  width: isHomeView ? "100%" : isLargeScreen ? "30%" : "80%",
  textAlign: isHomeView ? "left" : "center",
  paddingLeft: isHomeView ? "2rem" : "0",
  borderBottom: "1px solid #00d49a",
  paddingBottom: "0.3rem",
  color: "#000",
  fontSize: "1.4rem",
  fontStyle: "italic",
});
