import axios from "axios"; // libreria para manejar peticiones HTTP
import { useEffect}  from "react"; // libreria para ejecutar acciones al montar el componente.
import {useState } from "react";  // libreria para gestionar estados locales
import { useSelector } from "react-redux"; // libreria para manejar el estado global con Redux
import { useDispatch } from "react-redux"; // permite enviar acciones a Redux.
import { Link } from "react-router-dom"; 
import "/src/home.css";

import { authUser, userProfile, logout } from "/src/redux/userSlice.js";

import TreeComponent from "../TreeComponent";
import CreateTable from "../CreateTable";

function Home() {
  const userEmail = useSelector((state) => state.user.email);
  console.log("userEmail",userEmail);
  
  const dispatch = useDispatch();

  const [usuario_info, setUsuarioInfo] = useState({});

  const [cropsList, setCropsList] = useState([]);
  const [extracostsList, setExtracostsList] = useState([]);
  const [agrochemicalsList, setAgrochemicalsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [farmersCropsList, setFarmersCropsList] = useState([]);
  const [farmersCropsLists, setFarmersCropsLists] = useState([]);
  const [fertilizersList, setFertilizersList] = useState([]);

  // ------------          obtengo  data de todos los ususarios  >  ---------------//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          cropsRes,
          extracostsRes,
          agrochemicalsRes,
          usersRes,
          farmersCropsRes,
          farmersCropsLists,
          fertilizersRes,
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/crops`),
          axios.get(`${import.meta.env.VITE_API_URL}/extracosts`),
          axios.get(`${import.meta.env.VITE_API_URL}/agrochemicals`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/farmers_crops`),
          axios.get(
            `${import.meta.env.VITE_API_URL}/farmers_crops/mis_cultivos/1`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/fertilizers`),
        ]);

        setCropsList(cropsRes.data);
        setExtracostsList(extracostsRes.data);
        setAgrochemicalsList(agrochemicalsRes.data);
        setUsersList(usersRes.data);
        setFarmersCropsList(farmersCropsRes.data);
        setFarmersCropsLists(farmersCropsLists.data);
        setFertilizersList(fertilizersRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);


  // ------------          obtengo  data del ususario logeado  >  ---------------//

  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${userEmail}`
          );

          const userData = response.data;

          // Aquí puedes trabajar directamente con userData antes de actualizarlo en el estado
          console.log("Datos de usuario:", userData);
          console.log("Nombre:", userData.name);
          console.log("apelllido: ", userData.last_name);

          // Luego actualizas el estado
          setUsuarioInfo(userData);
         // Despachamos la acción para actualizar el email
         dispatch(authUser({ email: userData.email }));

         // Despachamos la acción para actualizar la identificación
         dispatch(userProfile({ identification: userData.id }));
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userEmail]);
  // --------------------------------------------------------------------------------------------------------------  //

  return (
    <div>
      <div className="div_1">
        <div className="loginbutton_div">
          <Link className="  LoginButton" to={`/login`}>
            Login
          </Link>
        </div>
        <div className="loginbutton_div">
          <h6>{usuario_info?.name || "Cargando nombre..."}</h6>
          <h6>{usuario_info?.last_name || "Cargando apellido..."}</h6>
          <h6>{userEmail || "Cargando email..."}</h6>
        </div>
      </div>
      <div className="contenedor">
        <h2>Lista de Cultivos de </h2> 
        <br />

        {farmersCropsLists.map((item, index) => (
          <div className="section">
            <ul>
              <li key={item.id}>
                ID: {item.id}  
              </li>
              <li>user_id: {item.user_id}</li>
              <li>crop_id: {item.crop_id}</li>
              <li>yield: {item.yield}</li>
              <li>price: {item.price}</li>
              <li>lease_cost_usd: {item.lease_cost_usd}</li>
              <li>lease_cost_kg: {item.lease_cost_kg}</li>
              <li>production_costs: {item.production_costs}</li>
              <li>gross_income: {item.gross_income}</li>
              <li>commercialization: {item.commercialization}</li>
              <li>freight_costs: {item.freight_costs}</li>
              <li>net_income: {item.net_income}</li>
            </ul>
          </div>
        ))}

       
      </div>
        <div>
            <CreateTable/>
        </div>
      <div className="contenedor">
        <div className="section">
          <h2>Lista de Cultivos </h2>
          <h2>(cropsList.map)</h2>

          <ul>
            {cropsList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Gastos Extra </h2>
          <h2> (extracostsList.map)</h2>

          <ul>
            {extracostsList.map((item, index) => (
              <li key={index}>{item.concept}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Agroquímicos </h2>
          <h2> (agrochemicalsList.map)</h2>

          <ul>
            {agrochemicalsList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Usuarios </h2>
          <h2> (usersList.map)</h2>

          <ul>
            {usersList.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Ingresos Brutos </h2>
          <h2> (farmersCropsList.map)</h2>

          <ul>
            {farmersCropsList.map((item, index) => (
              <li key={index}>{item.gross_income}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Fertilizantes Disponibles </h2>
          <h2> (fertilizersList.map)</h2>

          <ul>
            {fertilizersList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
