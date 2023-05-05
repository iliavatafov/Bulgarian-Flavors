import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";

import { Profile } from "./components/Auth/Profile";
import { UpdateProfile } from "./components/Auth/UpdateProfile";
import { ForgotPassword } from "./components/Auth/ForgotPassword";

import { ContactUs } from "./components/Contacts/ContactUs";
import { ForMe } from "./components/ForMe/ForMe";
import { Mission } from "./components/Mission/Mission";

import { RootLayout } from "./components/RootLayout/RootLayout";
import { Home } from "./components/Home/Home";
import { WineAndFood } from "./components/WineAndFood/WineAndFood";
import { TourismInitiatives } from "./components/TourismInitiatives/TourismInitiatives";
import { Destination } from "./components/Destination/Destination";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        { index: true, element: <Home /> },
        { path: "/wine&food", element: <WineAndFood /> },
        { path: "/next-destination", element: <Destination /> },
        { path: "/tourism-initiatives", element: <TourismInitiatives /> },
        { path: "/for-me", element: <ForMe /> },
        { path: "/mission", element: <Mission /> },
        { path: "/contact-us", element: <ContactUs /> },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/update-profile",
          element: (
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
