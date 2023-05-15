// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useAuth } from "../cotext/AuthContext";

// export const PublicRoute = ({ children }) => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (currentUser) {
//       navigate("/");
//     }
//   }, [currentUser, navigate]);

//   return currentUser ? null : children;
// };
