import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";

import Navbar from "./Navbar";
import CreateTable from "../CreateTable";
import Casos from "./Casos";
import Modal from "./Modal";
import CrearCaso from "./CrearCaso";

function Home() {
  const userEmail = useSelector((state) => state.user.email);
  const userName = useSelector((state) => state.user.name);
  const id = useSelector((state) => state.user.identification);

  const dispatch = useDispatch();

  const [cropsList, setCropsList] = useState([]);
  const [extracostsList, setExtracostsList] = useState([]);
  const [agrochemicalsList, setAgrochemicalsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [farmersCropsList, setFarmersCropsList] = useState([]);
  const [fertilizersList, setFertilizersList] = useState([]);

  // Getting data from all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          cropsRes,
          extracostsRes,
          agrochemicalsRes,
          usersRes,
          farmersCropsRes,
          fertilizersRes,
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/crops`),
          axios.get(`${import.meta.env.VITE_API_URL}/extracosts`),
          axios.get(`${import.meta.env.VITE_API_URL}/agrochemicals`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/farmers_crops`),
          axios.get(`${import.meta.env.VITE_API_URL}/fertilizers`),
        ]);

        setCropsList(cropsRes.data);
        setExtracostsList(extracostsRes.data);
        setAgrochemicalsList(agrochemicalsRes.data);
        setUsersList(usersRes.data);
        setFarmersCropsList(farmersCropsRes.data);
        setFertilizersList(fertilizersRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home_body">
      <div>
        <Navbar />
      </div>
      <div className="div_1">
        <div className="loginbutton_div">
          <Link className="LoginButton" to={`/login`}>
            Login
          </Link>
        </div>
        <div className="loginbutton_div">
          <h6> Usuario: {userName || "Cargando nombre..."}</h6>
          <h6>id : {id || "Cargando id..."}</h6>
        </div>
      </div>

      <div>
        <Casos />
      </div>

      <div>
        <CreateTable />
      </div>
      <Modal />
      <div>
        <Link to="/crear_caso">
          <button className="crear_caso">
            Crear caso
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
