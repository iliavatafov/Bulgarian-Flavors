import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { checkAuthState } from "./store/authSlice";

import { RootLayout } from "./components/RootLayout/RootLayout";
import { WineAndFood } from "./pages/WineAndFood/WineAndFood";
import { TourismInitiatives } from "./pages/TourismInitiatives/TourismInitiatives";
import { Destination } from "./pages/Destination/Destination";
import { AllArticles } from "./pages/AllArticles/AllArticles";

import "draft-js/dist/Draft.css";
import { ArticleDetails } from "./components/Articles/ArticleDetails/index";

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
        { index: true, element: <AllArticles /> },
        { path: "/wine-and-food", element: <WineAndFood /> },
        { path: "/next-destination", element: <Destination /> },
        { path: "/tourism-initiatives", element: <TourismInitiatives /> },
        { path: "/search", element: <AllArticles /> },
        { path: "/:section/:articleId", element: <ArticleDetails /> },
        { path: "*", element: <AllArticles /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
