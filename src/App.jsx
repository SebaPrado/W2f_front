import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/views/Layout";
import Home from "./components/views/Home";
import SignUp from "./components/views/SignUp";
import Login from "./components/views/Login";
import Home0 from "./components/views/Home0";
import Dashboard from "./components/views/Dashboard";
import Caso from "./components/views/Caso";
import CasoEdit from "./components/views/CasoEdit";
import CrearCaso from "./components/views/CrearCaso";
import Api_granos from "./components/views/Api_granos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/0",
        element: <Home />,
      },
      {
        path: "",
        element: <Home0 />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "db",
        element: <Dashboard />,
      },
      {
        path: "caso/:id",
        element: <Caso />,
      },
      {
        path: "caso/:id/edit",
        element: <CasoEdit />,
      },
      {
        path: "crear_caso",
        element: <CrearCaso />,
      },
      {
        path: "api_granos",
        element: <Api_granos />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
