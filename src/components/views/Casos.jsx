// src/components/Casos.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Caso from "./Caso";
import "./casos.css"

function Casos() {
  const id = useSelector((state) => state.user.identification);
  const [farmersCropsLists, setFarmersCropsLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmersCrops = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/farmers_crops/mis_cultivos/${id}`
        );
        setFarmersCropsLists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos de cultivos:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchFarmersCrops();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando cultivos...</div>;
  }

  return (
    
    <div className="contenedor_casos_padre">
      <div>
        <h4>lista de cultivos</h4>
      </div>
      <div className="contenedor_casos_hijo">
        {farmersCropsLists.length > 0 ? (
          farmersCropsLists.map((item) => (
            <Caso key={item.id} casoData={item} />
          ))
        ) : (
          <p>No hay cultivos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Casos;
