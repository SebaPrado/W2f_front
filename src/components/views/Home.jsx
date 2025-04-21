import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "./Navbar";
import Casos from "./Casos";

function Home() {
  const userName = useSelector((state) => state.user.name);
  const id = useSelector((state) => state.user.identification);

  return (
    <div className="hero_section_container">
      <div className="hero_section">
        <div>
          <Navbar />
        </div>
        <div className="hero_div_1">
          <div className="">
            <h2>Bienvenido {userName || "Usuario"}</h2>
            <h6>Cliente numero {id || "Cargando id..."}</h6>
          </div>
        </div>
        <div className="hero_div_2">
          <h4>Tus principales cultivos</h4>{" "}
          <div className="precios_cultivos">
            <div className="precio_cultivo">
              <p>
                Soja: 330{" "}
                <span className="icono_precio_alza" >
                  &#x25B2;
                </span>
              </p>
            </div>
            <div className="precio_cultivo">
              <p>
                Trigo: 230{" "}
                <span className="icono_precio_alza" >
                  &#x25BC;
                </span>
              </p>
            </div>
            <div className="precio_cultivo">
              <p>
                Maíz: 210{" "}
                <span className="icono_precio_baja" >
                  &#x25B2;
                </span>
              </p>
            </div>
            <div className="precio_cultivo">
              <p>
                Girasol: 550 <span className="icono_precio_alza">&#x25BC;</span>
              </p>
            </div>
          </div>
        </div>
        {/* <button className="mis_casos">Mis casos</button> */}
      </div>
      <div>
        <Casos />
      </div>
      <div>
        <Link to="/crear_caso">
          <button className="crear_caso">Crear caso</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

{
  /* <div>
<CreateTable />
</div> */
}
{
  /* <Modal /> */
}
