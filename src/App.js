import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { checkAuthState } from "./store/authSlice";

import { ContactUs } from "./pages/Contacts/ContactUs";
import { ForMe } from "./pages/ForMe/ForMe";
import { Mission } from "./pages/Mission/Mission";

import { RootLayout } from "./components/RootLayout/RootLayout";
import { Home } from "./pages/Home/Home";
import { WineAndFood } from "./pages/WineAndFood/WineAndFood";
import { TourismInitiatives } from "./pages/TourismInitiatives/TourismInitiatives";
import { Destination } from "./pages/Destination/Destination";
import { CreateArticle } from "./pages/CreateArticle/CreateArticle";
import { AllArticles } from "./pages/AllArticles/AllArticles";
import { AdminRoute } from "./components/AdminRoute";

import "draft-js/dist/Draft.css";
import { ArticleDetails } from "./components/Articles/ArticleDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/wine-and-food", element: <WineAndFood /> },
        { path: "/next-destination", element: <Destination /> },
        { path: "/tourism-initiatives", element: <TourismInitiatives /> },
        { path: "/for-me", element: <ForMe /> },
        { path: "/mission", element: <Mission /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/search", element: <AllArticles /> },
        {
          path: "/create-article",
          element: (
            <AdminRoute>
              <CreateArticle />
            </AdminRoute>
          ),
        },
        {
          path: "/edit-article/:section/:articleId",
          element: (
            <AdminRoute>
              <CreateArticle />
            </AdminRoute>
          ),
        },
        { path: "/:section/:articleId", element: <ArticleDetails /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
