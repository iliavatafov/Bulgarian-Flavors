// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useAuth } from "../cotext/AuthContext";

// export const PrivateRoute = ({ children }) => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   return currentUser ? children : null;
// };
