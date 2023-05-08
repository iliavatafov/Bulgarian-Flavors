import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ContactUs } from "./components/Contacts/ContactUs";
import { ForMe } from "./components/ForMe/ForMe";
import { Mission } from "./components/Mission/Mission";

import { RootLayout } from "./components/RootLayout/RootLayout";
import { Home } from "./components/Home/Home";
import { WineAndFood } from "./components/WineAndFood/WineAndFood";
import { TourismInitiatives } from "./components/TourismInitiatives/TourismInitiatives";
import { Destination } from "./components/Destination/Destination";
import { ModalProvider } from "./cotext/ModalContext";

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
      ],
    },
  ]);

  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
