// Layout.jsx
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
function Layout() {
  return (
    <div>
      {/* <Navbar />   */}

      <main>
        <Outlet />{" "}
        {/* Aquí se renderiza el contenido específico de cada ruta */}
      </main>

      {/* <Footer />   */}
    </div>
  );
}

export default Layout;
