import { useState, useEffect } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import Loader from "./Pages/Loader";

const AppWithLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // 3 sec baad loader remove hoga
    }, 3000);
  }, []);

  return (
    <StrictMode>
      {loading ? <Loader /> : <RouterProvider router={router} />}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<AppWithLoader />);
