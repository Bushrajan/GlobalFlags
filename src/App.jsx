import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import DetailPage from "./Pages/DetailPage";
import Page404 from "./Pages/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/NationFlags/Home", element: <Home /> },
      { path: "/NationFlags-Detail/:id", element: <DetailPage /> },
      { path: "*", element: <Page404 /> },  
    ],
  },
]);

export default router;
