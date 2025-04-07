// // import { RouterProvider } from "react-router-dom";
// // import router from "./routes";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./components/views/Layout";
// // import About from "./Components/views/About";
// // import NotFound from "./Components/views/NotFound";
// import Home from "./components/views/Home";
// // import Home0 from "./Components/views/Home0";
// // import FramerMotion from "./Components/views/FramerMotion";
// // import FramerMotion2 from "./Components/views/FramerMotion2";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       //       {
//       //         path: "about",
//       //         element: <About />,
//       //       },

//       //       {
//       //         path: "home0",
//       //         element: <Home0 />,
//       //       },

//       //       {
//       //         path: "fm",
//       //         element: <FramerMotion />,
//       //       },
//       //       {
//       //         path: "fm2",
//       //         element: <FramerMotion2 />,
//       //       },
//     ],
//     //   },
//     //   {
//     //     path: "*",
//     //     element: <NotFound />,
//   },
// ]);

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;

import "./App.css";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/views/Layout";
import Home from "./components/views/Home";
import SignUp from "./components/views/SignUp";
import Login from "./components/views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
